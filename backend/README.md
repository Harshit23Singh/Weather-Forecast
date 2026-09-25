# Gram Mausam AI - Backend Gateway

High-concurrency FastAPI microservice providing hyper-local agro-meteorology, spatial downscaling inference, and Indian Gram Panchayat geospatial indexing.

## Quickstart

### Prerequisites
- Python 3.10+
- Virtualenv

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Run Dev Server
```bash
uvicorn app.main:app --reload --port 8000
```

### Interactive API Documentation
- Swagger UI: `http://localhost:8000/api/v1/docs`
- ReDoc: `http://localhost:8000/api/v1/redoc`

### Test Suite
```bash
pytest tests/ -v
```
