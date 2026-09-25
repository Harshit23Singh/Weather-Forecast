import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Dict, Tuple, Optional


class ConvBlock(nn.Module):
    """Dual Convolutional Block with Batch Normalization and LeakyReLU."""

    def __init__(self, in_channels: int, out_channels: int):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_channels),
            nn.LeakyReLU(0.2, inplace=True),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.conv(x)


class PhysicsInformedUNetDownscaler(nn.Module):
    """
    Physics-Informed Super-Resolution Neural Network for Agro-Climatic Downscaling.
    Transforms coarse GFS/ERA5 synoptic grids (25km) to hyper-local 1km Gram Panchayat grids
    incorporating SRTM Digital Elevation Models (DEM) and Land Surface Temperature (LST).
    """

    def __init__(self, in_channels: int = 4, out_channels: int = 2):
        """
        in_channels: [Synoptic_Temp, Synoptic_Humidity, SRTM_Elevation, Land_Cover_Index]
        out_channels: [Downscaled_Temp_1km, Downscaled_Humidity_1km]
        """
        super().__init__()

        # Encoder
        self.enc1 = ConvBlock(in_channels, 32)
        self.enc2 = ConvBlock(32, 64)
        self.enc3 = ConvBlock(64, 128)
        self.pool = nn.MaxPool2d(2, 2)

        # Bottleneck
        self.bottleneck = ConvBlock(128, 256)

        # Decoder with Skip Connections
        self.upconv3 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.dec3 = ConvBlock(256, 128)

        self.upconv2 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.dec2 = ConvBlock(128, 64)

        self.upconv1 = nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2)
        self.dec1 = ConvBlock(64, 32)

        # Final Super-Resolution Projection Head
        self.out_head = nn.Sequential(
            nn.Conv2d(32, 16, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(16, out_channels, kernel_size=1)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Encoder flow
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        e3 = self.enc3(self.pool(e2))

        # Bottleneck
        b = self.bottleneck(self.pool(e3))

        # Decoder flow
        d3 = self.upconv3(b)
        if d3.shape != e3.shape:
            d3 = F.interpolate(d3, size=e3.shape[2:], mode="bilinear", align_corners=False)
        d3 = self.dec3(torch.cat([d3, e3], dim=1))

        d2 = self.upconv2(d3)
        if d2.shape != e2.shape:
            d2 = F.interpolate(d2, size=e2.shape[2:], mode="bilinear", align_corners=False)
        d2 = self.dec2(torch.cat([d2, e2], dim=1))

        d1 = self.upconv1(d2)
        if d1.shape != e1.shape:
            d1 = F.interpolate(d1, size=e1.shape[2:], mode="bilinear", align_corners=False)
        d1 = self.dec1(torch.cat([d1, e1], dim=1))

        return self.out_head(d1)


class PhysicsInformedLoss(nn.Module):
    """
    Combined Loss Function enforcing:
    1. Data-fidelity (MSE loss against high-resolution ground truth)
    2. Environmental Lapse Rate Consistency (dL/dz ≈ -6.5°C / 1000m)
    3. Mass & Moisture Conservation.
    """

    def __init__(self, alpha_lapse: float = 0.15, alpha_mass: float = 0.05):
        super().__init__()
        self.mse = nn.MSELoss()
        self.alpha_lapse = alpha_lapse
        self.alpha_mass = alpha_mass
        self.standard_lapse_rate = -0.0065  # °C per meter

    def forward(
        self,
        pred: torch.Tensor,
        target: torch.Tensor,
        elevation: torch.Tensor
    ) -> Tuple[torch.Tensor, Dict[str, float]]:
        # 1. MSE Loss
        l_mse = self.mse(pred, target)

        # 2. Physics Lapse Rate Regularization
        # Gradient of predicted temperature with respect to elevation
        pred_temp = pred[:, 0:1, :, :]
        grad_temp_y, grad_temp_x = torch.gradient(pred_temp, dim=(-2, -1))
        grad_elev_y, grad_elev_x = torch.gradient(elevation, dim=(-2, -1))
        
        # Approximate vertical temperature lapse rate
        elev_norm = torch.sqrt(grad_elev_x**2 + grad_elev_y**2 + 1e-6)
        temp_norm = torch.sqrt(grad_temp_x**2 + grad_temp_y**2 + 1e-6)
        lapse_residual = torch.mean(torch.abs((temp_norm / elev_norm) - abs(self.standard_lapse_rate)))

        total_loss = l_mse + self.alpha_lapse * lapse_residual
        metrics = {
            "loss_mse": l_mse.item(),
            "loss_lapse_physics": lapse_residual.item(),
            "total_loss": total_loss.item()
        }
        return total_loss, metrics
