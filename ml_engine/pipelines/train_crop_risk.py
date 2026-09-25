from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import numpy as np
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("train_crop_risk")


def generate_crop_pest_training_dataset(samples_per_crop: int = 500):
    """
    Generates tabular dataset mapping microclimatic metrics to pest infestation risk:
    Features: [Temp_mean, Relative_Humidity, Rain_7d_sum, Wind_speed, Soil_Moisture, GDD]
    Labels: 0 (Low), 1 (Moderate), 2 (Severe Outbreak)
    """
    np.random.seed(42)
    crops = ["wheat", "paddy", "cotton", "mustard"]
    all_features = []
    all_labels = []

    for crop in crops:
        temp = np.random.uniform(10.0, 42.0, samples_per_crop)
        hum = np.random.uniform(30.0, 95.0, samples_per_crop)
        rain = np.random.exponential(scale=15.0, size=samples_per_crop)
        wind = np.random.uniform(2.0, 30.0, samples_per_crop)
        soil_m = np.random.uniform(0.15, 0.50, samples_per_crop)
        gdd = np.maximum(0, temp - 10.0) * np.random.uniform(15, 30, samples_per_crop)

        # Label synthesis based on ICAR threshold dynamics
        labels = np.zeros(samples_per_crop, dtype=int)
        # Moderate risk condition
        mod_mask = (hum > 70.0) & (temp > 20.0) & (temp < 32.0)
        labels[mod_mask] = 1
        # High outbreak risk
        high_mask = (hum > 80.0) & (temp > 24.0) & (temp < 30.0) & (rain < 5.0)
        labels[high_mask] = 2

        features = np.column_stack([temp, hum, rain, wind, soil_m, gdd])
        all_features.append(features)
        all_labels.append(labels)

    X = np.vstack(all_features)
    y = np.concatenate(all_labels)
    return X, y


def train_pest_classifier():
    logger.info("Training Random Forest Crop Pest Risk Ensemble...")
    X, y = generate_crop_pest_training_dataset()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    clf = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    acc = accuracy_score(y_test, preds)
    logger.info(f"Model Validation Accuracy: {acc * 100:.2f}%")
    logger.info("\n" + classification_report(y_test, preds, target_names=["Low", "Moderate", "Severe Outbreak"]))

    return clf


if __name__ == "__main__":
    train_pest_classifier()
