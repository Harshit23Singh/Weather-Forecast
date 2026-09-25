#!/usr/bin/env python3
"""
Gram Mausam AI - Command Line Interface (CLI) Utility
Used by Krishi Vigyan Kendra (KVK) officers and district agricultural departments
for batch offline downscaling and automated agro-advisory dispatch.
"""

import argparse
import sys
import json
from pathlib import Path

# Add project root to path
ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT_DIR))
sys.path.insert(0, str(ROOT_DIR / "backend"))

from ml_engine.models.spatial_interpolator import spatial_interpolator
from ml_engine.models.crop_risk_classifier import crop_risk_classifier
from backend.app.services.geospatial_service import geospatial_service


def run_batch_downscale(district: str = "Barabanki", crop: str = "Wheat"):
    print(f"\n=======================================================")
    print(f"🌾 Gram Mausam AI - Batch 1km Micro-Grid Processor")
    print(f"Target District: {district} | Primary Crop: {crop}")
    print(f"=======================================================\n")

    panchayats = [p for p in geospatial_service.registry if district.lower() in p.district.lower()]
    if not panchayats:
        panchayats = geospatial_service.registry[:5]

    print(f"Found {len(panchayats)} registered Gram Panchayats. Processing downscaling...\n")

    for p in panchayats:
        base_temp = 31.0
        base_hum = 62.0
        res = spatial_interpolator.downscale_point(
            base_temp=base_temp,
            base_humidity=base_hum,
            base_elevation=200.0,
            target_elevation=p.elevation_m
        )

        risk = crop_risk_classifier.predict_risk(
            crop=crop,
            avg_temp=res["downscaled_temperature"],
            avg_humidity=res["downscaled_humidity"],
            rain_sum_mm=0.0,
            wind_speed_kmh=10.0
        )

        print(f"📍 Panchayat: {p.name} (Elev: {p.elevation_m}m)")
        print(f"   -> 1km Downscaled Temp: {res['downscaled_temperature']}°C (Delta: {res['thermal_delta_c']}°C)")
        print(f"   -> Relative Humidity: {res['downscaled_humidity']}% | Soil Temp: {res['microclimate_soil_temp']}°C")
        print(f"   -> Crop Risk Index: {risk['overall_pest_risk_index']} | Spray: {risk['field_operations']['chemical_spray_suitability']}")
        print(f"   ----------------------------------------------------")

    print("\n✅ Batch downscaling and agro-risk evaluation complete.\n")


def main():
    parser = argparse.ArgumentParser(description="Gram Mausam AI Batch CLI Processor")
    parser.add_argument("--district", type=str, default="Barabanki", help="Target district name")
    parser.add_argument("--crop", type=str, default="Wheat", help="Target crop (Wheat, Paddy, Mustard, Cotton)")

    args = parser.parse_args()
    run_batch_downscale(district=args.district, crop=args.crop)


if __name__ == "__main__":
    main()
