import torch
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
import logging
from ml_engine.models.pinn_downscaler import PhysicsInformedUNetDownscaler, PhysicsInformedLoss

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("train_pinn_downscaler")


def generate_synthetic_era5_data(num_samples: int = 200, grid_size: int = 32):
    """
    Generates synthetic synoptic training pairs:
    Inputs: [Coarse_Temp, Coarse_Humidity, DEM_Elevation, Vegetation_Index]
    Targets: [HighRes_Temp_1km, HighRes_Humidity_1km]
    """
    np.random.seed(42)
    # 4 channels: Temp, Humidity, Elevation, LandCover
    X = np.random.randn(num_samples, 4, grid_size, grid_size).astype(np.float32)
    X[:, 0, :, :] = X[:, 0, :, :] * 5.0 + 30.0  # Base Temp 20-40C
    X[:, 1, :, :] = np.clip(X[:, 1, :, :] * 15.0 + 60.0, 10.0, 100.0)  # Humidity 10-100%
    X[:, 2, :, :] = np.abs(X[:, 2, :, :]) * 300.0 + 100.0  # Elevation 100-1000m
    X[:, 3, :, :] = np.clip(np.random.rand(num_samples, grid_size, grid_size), 0.1, 0.9)  # NDVI

    # Physical target generation
    lapse_rate = 0.0065
    y_temp = X[:, 0:1, :, :] - (X[:, 2:3, :, :] - 200.0) * lapse_rate + np.random.randn(num_samples, 1, grid_size, grid_size) * 0.2
    y_hum = np.clip(X[:, 1:2, :, :] + (X[:, 2:3, :, :] - 200.0) * 0.01 + np.random.randn(num_samples, 1, grid_size, grid_size) * 0.5, 10.0, 100.0)
    y = np.concatenate([y_temp, y_hum], axis=1).astype(np.float32)

    return torch.tensor(X), torch.tensor(y)


def train_model(epochs: int = 5, batch_size: int = 16, lr: float = 1e-3):
    logger.info("Initializing PINN UNet downscaler training pipeline...")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"Using compute device: {device}")

    X, y = generate_synthetic_era5_data()
    dataset = TensorDataset(X, y)
    loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    model = PhysicsInformedUNetDownscaler(in_channels=4, out_channels=2).to(device)
    criterion = PhysicsInformedLoss(alpha_lapse=0.15)
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)

    model.train()
    for epoch in range(epochs):
        epoch_loss = 0.0
        for batch_x, batch_y in loader:
            batch_x, batch_y = batch_x.to(device), batch_y.to(device)
            elevation = batch_x[:, 2:3, :, :]

            optimizer.zero_grad()
            predictions = model(batch_x)
            loss, metrics = criterion(predictions, batch_y, elevation)
            loss.backward()
            optimizer.step()

            epoch_loss += loss.item()

        avg_loss = epoch_loss / len(loader)
        logger.info(f"Epoch [{epoch+1}/{epochs}] - Total PINN Loss: {avg_loss:.4f}")

    logger.info("Training complete. Model weights ready for export to ONNX.")
    return model


if __name__ == "__main__":
    train_model(epochs=3)
