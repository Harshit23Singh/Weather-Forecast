# Gram Mausam AI - End-to-End System Architecture

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

## System Components

### 1. Presentation Tier (`src/`)
- Built on modern React 19 with Vite, Lucide-React, and Tailwind CSS.
- **Micro-climate Map Engine**: Pure Leaflet integration with interactive OpenStreetMap raster tiles, multi-point polygon boundaries, and coordinate click-to-telemetry inspectors.
- **Firebase Authentication**: Google OAuth 2.0 sign-in with local persistence.

### 2. Microclimate Super-Resolution Engine (`ml_engine/`)
- **PINN UNet Super-Resolution**: Downscales 25km GFS/ERA5 synoptic atmospheric tensors down to 1km x 1km Gram Panchayat scale.
- **Physical Loss Constraints**: Enforces adiabatic lapse rates (\(\Gamma \approx -6.5^\circ\text{C}/\text{km}\)) and mass/moisture conservation.
- **Evapotranspiration Engine**: Full implementation of the standard FAO Irrigation and Drainage Paper No. 56 Penman-Monteith formula.

### 3. API & Middleware Gateway (`backend/app/`)
- High-concurrency asynchronous ASGI service powered by FastAPI and Uvicorn.
- Endpoints for 1km downscaling, crop risk scoring, Panchayat registry search, and automated agro-advisories.
- Redis geospatial cache layer for synoptic forecasts.
