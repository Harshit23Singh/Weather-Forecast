<div align="center">

# 🌾 Gram Mausam AI (ग्राम मौसम AI)
### **Physics-Informed Hyper-Local Agro-Meteorological Intelligence & Micro-Climate Downscaling Engine**

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_0.110-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PyTorch](https://img.shields.io/badge/ML_Engine-PyTorch_PINN-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript_5-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet_%2B_OSM-199900.svg?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com)
[![Docker](https://img.shields.io/badge/Deploy-Docker_Compose-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>Bridging the 25km Numerical Weather Prediction gap to deliver 1km x 1km Gram Panchayat-scale crop intelligence, FAO-56 evapotranspiration models, and ICAR-standard agro-advisories for 140+ million Indian farmers.</b>
</p>

[Live Demo](http://localhost:5173) • [API Documentation](http://localhost:8000/api/v1/docs) • [Architecture Guide](ARCHITECTURE.md) • [ML Methodology](ML_METHODOLOGY.md)

---

</div>

## 📌 The Problem: The "Last-Mile" Meteorological Gap

Traditional synoptic weather models (e.g. ECMWF ERA5, NOAA GFS, IMD WRF) operate at **12km to 50km grid resolutions**. In diverse Indian topographies:
- A single 25km grid cell merges valley bottoms with hillslopes, obliterating micro-climatic frost pockets and thermal inversions.
- Coarse models cannot capture field-level relative humidity spikes that trigger devastating fungal outbreaks (*Yellow Rust*, *Brown Plant Hopper*).
- Smallholder farmers receive generic district bulletins rather than **field-actionable spray windows and irrigation timing**.

```
+-------------------------------------------------------------------------------+
| Coarse Synoptic Forecast (25km x 25km)   --->   Gram Mausam AI PINN (1km x 1km) |
| [ 1 Generic District Temperature ]              [ Field-Level Topographic     |
| [ Misses Inversions & Frost Pockets ]            Elevation Lapse & Canopy RH  |
| [ No Crop-Specific Spray Window ]                Actionable ICAR Advisories ] |
+-------------------------------------------------------------------------------+
```

---

## 🌟 Core Innovations & Features

### 1. 🧠 Physics-Informed Micro-Climate Downscaling (PINN)
- **Deep Convolutional Super-Resolution UNet**: Downscales coarse synoptic atmospheric grids to **1km x 1km hyper-local resolution**.
- **Physics Conservation Losses**: Incorporates SRTM 30m Digital Elevation Models (DEM) and strictly enforces the environmental adiabatic lapse rate:
  $$\frac{\partial T}{\partial z} \approx -0.0065 \, ^\circ\text{C}/\text{m}$$
- Eliminates non-physical machine learning hallucinations through atmospheric energy and moisture continuity equations.

### 2. 💧 FAO-56 Penman-Monteith Evapotranspiration ($ET_0$) Engine
- Implements the complete standard **FAO Irrigation and Drainage Paper No. 56** thermodynamic model.
- Integrates aerodynamic resistance, saturation vapor pressure deficit ($e_s - e_a$), net radiation ($R_n$), and solar declination angles for precision irrigation scheduling.

### 3. 🛡️ ICAR-Calibrated Pest Outbreak & Abiotic Stress Classifier
- Real-time decision ensemble monitoring temperature-humidity-wind thresholds for major Kharif & Rabi crops (Paddy, Wheat, Mustard, Cotton, Sugarcane, Soybean).
- **Early Warnings for**:
  - *Brown Plant Hopper (Nilaparvata lugens)*
  - *Yellow/Stripe Rust (Puccinia striiformis)*
  - *Mustard Aphid (Lipaphis erysimi)*
  - *Pink Bollworm (Pectinophora gossypiella)*
  - *Terminal Heat Stress & Frost Injury*

### 4. 🗺️ High-Performance Leaflet GIS & Indian Panchayat Registry
- Pure Leaflet engine with **100% open-source OpenStreetMap raster layers** (Rainfall, Thermal, Humidity, and Wind vector layers).
- Indexed spatial database of **50+ Indian Gram Panchayats** across 8 agro-climatic zones with Haversine nearest-neighbor GPS lookup.

### 5. 🔐 Enterprise Architecture & Google OAuth Integration
- Full-stack decoupled architecture with high-concurrency **FastAPI (Python 3.11)** backend and **React 19** frontend.
- Secure Firebase Google Authentication with persistent user sessions.

---

## 🏛️ System Architecture

```
                                  +---------------------------------------+
                                  |        Client Presentation Tier       |
                                  |   (React 19, TypeScript, Leaflet,     |
                                  |    TailwindCSS, Lucide-React, Vite)   |
                                  +-------------------+-------------------+
                                                      |
                                    REST / JSON (HTTPS)
                                                      |
                                  +-------------------v-------------------+
                                  |       API Gateway & Middleware        |
                                  |     (FastAPI ASGI, Pydantic v2,       |
                                  |      CORS, OpenTelemetry, Redis)      |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
         +---------------v---------------+                         +---------------v---------------+
         |      Geospatial Telemetry     |                         |     PINN ML Inference Core    |
         |  - Open-Meteo Synoptic Grid   |                         |  - Physics-Informed UNet      |
         |  - Indian Panchayat Registry  |                         |  - SRTM 30m DEM Lapse Model   |
         |  - Haversine Spatial Index    |                         |  - FAO-56 Penman-Monteith     |
         +---------------+---------------+                         |  - ICAR Pest Risk Classifier  |
                         |                                         +---------------+---------------+
                         |                                                         |
                         +----------------------------+----------------------------+
                                                      |
                                  +-------------------v-------------------+
                                  |       Actionable Advisory Layer       |
                                  |   - Crop-Specific Spray Windows       |
                                  |   - Soil Moisture & Irrigation Urgency|
                                  |   - Extreme Weather / Frost Alerts    |
                                  +---------------------------------------+
```

---

## 📂 Repository Structure

```
gram-mausam-ai/
├── backend/                      # High-concurrency FastAPI Microservice
│   ├── app/
│   │   ├── main.py               # Application entrypoint & lifespan management
│   │   ├── core/config.py        # Pydantic v2 BaseSettings configuration
│   │   ├── schemas/              # Data validation schemas (Weather, Location, ML)
│   │   ├── services/             # WeatherService, GeospatialService
│   │   └── api/v1/endpoints/     # REST Endpoints (health, weather, locations, ml, advisory)
│   ├── tests/                    # Pytest test suites
│   ├── Dockerfile                # Multi-stage production container
│   └── requirements.txt          # Python dependencies
│
├── ml_engine/                    # Machine Learning & Physics Downscaling Core
│   ├── models/                   # PhysicsInformedUNetDownscaler, SpatialInterpolator
│   ├── physics/                  # FAO56PenmanMonteith, SolarRadiationModel
│   ├── pipelines/                # Model trainers (train_downscaler, train_crop_risk)
│   └── notebooks/                # Research notebooks (ERA5 downscaling, Pest modeling)
│
├── src/                          # React 19 Frontend Web Application
│   ├── components/               # LeafletMap, Header, Sidebar, MetricCards
│   ├── context/                  # AuthContext (Firebase), WeatherContext
│   ├── services/                 # weatherService, indianLocationsData
│   └── pages/                    # Dashboard, WeatherMap, CropIntelligence, AgroAdvisory
│
├── .github/workflows/            # GitHub Actions CI/CD (Backend CI, ML Validation, Frontend Build)
├── docker-compose.yml            # Multi-container orchestration (Backend, Frontend, Redis)
├── ARCHITECTURE.md               # Detailed system architecture specification
└── ML_METHODOLOGY.md             # Formal mathematical formulation of PINN & FAO-56
```

---

## ⚡ Quick Start Guide

### Option 1: Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/Harshit23Singh/Weather-Forecast.git
cd Weather-Forecast

# Launch Frontend, Backend, and Redis stack
docker-compose up --build
```
- **Frontend Dashboard**: `http://localhost:5173`
- **FastAPI Interactive Docs (Swagger)**: `http://localhost:8000/api/v1/docs`

---

### Option 2: Local Manual Setup

#### 1. Frontend Setup
```bash
npm install
npm run dev
```

#### 2. Backend API Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service uptime and ML inference engine health status |
| `GET` | `/api/v1/weather/forecast?lat=26.9&lon=81.1` | High-precision synoptic weather telemetry |
| `GET` | `/api/v1/locations/search?q=Khanna` | Search registered Indian Gram Panchayats |
| `POST` | `/api/v1/ml/downscale` | 1km micro-climate super-resolution with terrain lapse |
| `POST` | `/api/v1/ml/crop-risk` | Predict crop pest outbreak & abiotic stress |
| `GET` | `/api/v1/advisory/panchayat-bulletin` | Generate automated ICAR/IMD agro-advisory bulletin |

---

## 🧪 Automated Testing & Verification

```bash
# Run backend & ML test suite
pytest backend/tests/ -v

# Execute ML downscaler training verification
python ml_engine/pipelines/train_downscaler.py

# Execute crop risk classification test
python ml_engine/pipelines/train_crop_risk.py
```

---

## 🏆 Key Achievements & Impact

- **1km Resolution**: 25x higher spatial resolution than standard numerical weather prediction grids.
- **Physics Guardrails**: Zero unconstrained ML hallucinations; respects thermodynamic energy equations.
- **Zero-Cost Telemetry**: Fully powered by open data pipelines and OpenStreetMap raster grids.
- **Actionable Agro-Intelligence**: Directly answers *“Should I spray today?”* and *“How much water does my field need?”*.

---

## 📄 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <b>Built with ❤️ for India's 140M+ Farming Families</b>
</div>
