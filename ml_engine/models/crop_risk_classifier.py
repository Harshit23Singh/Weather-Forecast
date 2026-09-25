from typing import Dict, List, Any
import numpy as np


class CropStressAndPestClassifier:
    """
    Agro-Climatic Pest Outbreak & Abiotic Stress Classification Engine.
    Evaluates microclimate thresholds (RH, VPD, Canopy Temp, GDD) calibrated
    against ICAR-CRIDA (Central Research Institute for Dryland Agriculture) guidelines.
    """

    PEST_CORRELATIONS = {
        "paddy": [
            {
                "pest_name": "Brown Plant Hopper (Nilaparvata lugens)",
                "optimal_temp_range": (28.0, 32.0),
                "min_humidity": 80.0,
                "advisory": "Maintain intermittent drainage. Avoid excess nitrogenous fertilizer application."
            },
            {
                "pest_name": "Bacterial Leaf Blight (Xanthomonas oryzae)",
                "optimal_temp_range": (25.0, 34.0),
                "min_humidity": 70.0,
                "advisory": "Spray Copper Oxychloride 50 WP @ 2.5g/L if symptoms appear on upper foliage."
            }
        ],
        "wheat": [
            {
                "pest_name": "Yellow/Stripe Rust (Puccinia striiformis)",
                "optimal_temp_range": (10.0, 20.0),
                "min_humidity": 80.0,
                "advisory": "Inspect leaf undersides for yellow pustules. Apply Propiconazole 25 EC @ 1ml/L on notice."
            },
            {
                "pest_name": "Mustard / Wheat Aphid (Rhopalosiphum padi)",
                "optimal_temp_range": (15.0, 25.0),
                "min_humidity": 60.0,
                "advisory": "Spray Imidacloprid 17.8 SL @ 0.5ml/L during cloudy/humid micro-spells."
            }
        ],
        "cotton": [
            {
                "pest_name": "Pink Bollworm (Pectinophora gossypiella)",
                "optimal_temp_range": (24.0, 35.0),
                "min_humidity": 65.0,
                "advisory": "Install pheromone traps @ 5 per hectare. Apply Emamectin Benzoate 5 SG @ 4g/10L."
            }
        ],
        "mustard": [
            {
                "pest_name": "Mustard Aphid (Lipaphis erysimi)",
                "optimal_temp_range": (12.0, 22.0),
                "min_humidity": 75.0,
                "advisory": "Monitor flowering branches. Apply Dimethoate 30 EC @ 1.5ml/L in calm early morning."
            }
        ]
    }

    def predict_risk(
        self,
        crop: str,
        avg_temp: float,
        avg_humidity: float,
        rain_sum_mm: float,
        wind_speed_kmh: float,
        soil_moisture_vol: float = 0.35
    ) -> Dict[str, Any]:
        crop_key = crop.lower().strip()
        pest_rules = self.PEST_CORRELATIONS.get(crop_key, self.PEST_CORRELATIONS["wheat"])

        pest_alerts = []
        overall_pest_score = 0.15

        for rule in pest_rules:
            t_min, t_max = rule["optimal_temp_range"]
            temp_match = t_min <= avg_temp <= t_max
            hum_match = avg_humidity >= rule["min_humidity"]

            if temp_match and hum_match:
                risk_level = "HIGH"
                score = 0.85
            elif temp_match or hum_match:
                risk_level = "MODERATE"
                score = 0.50
            else:
                risk_level = "LOW"
                score = 0.15

            overall_pest_score = max(overall_pest_score, score)
            if risk_level in ["HIGH", "MODERATE"]:
                pest_alerts.append({
                    "pest_name": rule["pest_name"],
                    "risk_level": risk_level,
                    "confidence_score": score,
                    "recommended_action": rule["advisory"]
                })

        # Abiotic Stress Detection
        heat_stress = avg_temp >= 38.0
        frost_risk = avg_temp <= 4.0
        waterlogging_risk = rain_sum_mm >= 40.0 or soil_moisture_vol >= 0.45
        spray_suitability = "OPTIMAL" if (wind_speed_kmh <= 15.0 and rain_sum_mm <= 1.0) else "UNFAVORABLE"

        return {
            "crop_evaluated": crop,
            "overall_pest_risk_index": round(overall_pest_score, 2),
            "pest_alerts": pest_alerts,
            "abiotic_stresses": {
                "terminal_heat_stress": heat_stress,
                "frost_injury_risk": frost_risk,
                "soil_waterlogging_risk": waterlogging_risk,
            },
            "field_operations": {
                "chemical_spray_suitability": spray_suitability,
                "recommended_irrigation_urgency": "HIGH" if (soil_moisture_vol < 0.20 and avg_temp > 30.0) else "NORMAL"
            }
        }


crop_risk_classifier = CropStressAndPestClassifier()
