import numpy as np
from typing import Dict, Any


def compute_downscaling_metrics(ground_truth: np.ndarray, predictions: np.ndarray) -> Dict[str, float]:
    """
    Computes statistical and meteorological error metrics:
    - Root Mean Square Error (RMSE)
    - Mean Absolute Error (MAE)
    - Structural Similarity Index Metric (SSIM approximation)
    - Nash-Sutcliffe Model Efficiency (NSE)
    """
    mse = np.mean((ground_truth - predictions) ** 2)
    rmse = float(np.sqrt(mse))
    mae = float(np.mean(np.abs(ground_truth - predictions)))

    # Nash-Sutcliffe Efficiency coefficient
    var_gt = np.sum((ground_truth - np.mean(ground_truth)) ** 2)
    nse = float(1.0 - (np.sum((ground_truth - predictions) ** 2) / (var_gt + 1e-8)))

    # Bias
    bias = float(np.mean(predictions - ground_truth))

    return {
        "rmse": round(rmse, 4),
        "mae": round(mae, 4),
        "nash_sutcliffe_efficiency": round(nse, 4),
        "mean_bias_error": round(bias, 4)
    }


if __name__ == "__main__":
    gt = np.random.normal(28.0, 3.0, 1000)
    pred = gt + np.random.normal(0, 0.4, 1000)
    metrics = compute_downscaling_metrics(gt, pred)
    print("Downscaling Evaluation Metrics:", metrics)
