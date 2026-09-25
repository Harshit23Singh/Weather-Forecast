import torch
import pytest
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR))

from ml_engine.models.pinn_downscaler import PhysicsInformedLoss, PhysicsInformedUNetDownscaler


def test_pinn_gradient_backpropagation():
    # Batch size 2, 4 channels, 16x16 grid
    x = torch.randn(2, 4, 16, 16, requires_grad=True)
    target = torch.randn(2, 2, 16, 16)
    elevation = x[:, 2:3, :, :]

    model = PhysicsInformedUNetDownscaler(in_channels=4, out_channels=2)
    criterion = PhysicsInformedLoss(alpha_lapse=0.15)

    pred = model(x)
    loss, metrics = criterion(pred, target, elevation)

    assert "loss_mse" in metrics
    assert "loss_lapse_physics" in metrics
    assert loss.item() > 0.0

    loss.backward()
    # Check that model weights received valid gradients
    for p in model.parameters():
        if p.requires_grad:
            assert p.grad is not None
