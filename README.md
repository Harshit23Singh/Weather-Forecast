# 🌾 Gram Mausam AI

**Hyper-Local Agro-Meteorological Intelligence & Micro-Climate Downscaling Platform for Indian Agriculture.**

Gram Mausam AI transforms coarse synoptic weather forecasts (25km–50km) into actionable 1km x 1km Gram Panchayat-level agro-advisories, crop-specific spray windows, irrigation schedules, and pest vulnerability alerts.

---

## 🚀 Key Features

- **Hyper-Local 1km Micro-Climate Super-Resolution**: Physics-Informed Neural Network (PINN) downscaling combining SRTM 30m Digital Elevation Models with synoptic numerical grids.
- **Dynamic Agro-Advisories (ICAR/IMD Standards)**: Automatic formulation of spray windows, drainage requirements, and thermal stress alerts based on localized humidity, wind drift, and temperature.
- **Interactive Open-Source Maps**: Pure Leaflet + OpenStreetMap raster layers with multi-layer overlays (Rainfall, Temperature, Humidity, Wind) and coordinate click inspection.
- **Reference Evapotranspiration ($ET_0$)**: Full thermodynamic FAO-56 Penman-Monteith computation for precision irrigation scheduling.
- **Indian Gram Panchayat Spatial Registry**: Over 50+ indexed Indian agricultural clusters across Uttar Pradesh, Punjab, Haryana, Maharashtra, Madhya Pradesh, Gujarat, and Rajasthan.
- **Authentication**: Google OAuth 2.0 integration via Firebase.

---

## 🏗️ Architecture & Tech Stack

```
[ Frontend: React 19 + Vite + TailwindCSS + Leaflet ]
                       │
                       ▼  (REST API)
[ Backend Gateway: FastAPI + Pydantic v2 + Uvicorn ]
         │                                   │
         ▼                                   ▼
[ Geospatial Telemetry: Open-Meteo ]   [ ML Engine: PINN UNet + FAO-56 + ICAR Ensembles ]
```

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Leaflet, Firebase Auth.
- **Backend**: FastAPI (Python 3.11), Uvicorn, Pydantic Settings, HTTPX, GeoPandas, Redis.
- **Machine Learning**: PyTorch, Scikit-Learn, NumPy, SciPy, FAO-56 Penman-Monteith, Physics-Informed UNet.
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD.

---

## ⚡ Quick Start

### 1. Frontend Web Client
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The web dashboard will be available at `http://localhost:5173`.

### 2. Backend API Service
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
FastAPI Swagger docs will be available at `http://localhost:8000/api/v1/docs`.

### 3. Docker Compose (Full Stack)
```bash
docker-compose up --build
```

---

## 🧪 Testing & Model Validation

```bash
# Run backend & ML test suite
pytest backend/tests/ -v

# Run ML downscaling training pipeline
python ml_engine/pipelines/train_downscaler.py
```

---

## 📄 License
MIT License. Built with ❤️ for Indian farmers.
