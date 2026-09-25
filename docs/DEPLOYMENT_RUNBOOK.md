# Gram Mausam AI - Production Deployment Runbook

## 1. Cloud Architecture Overview

Gram Mausam AI is architected for deployment on NIC MeghRaj Cloud, AWS (ap-south-1 Mumbai), or on-premises KVK Linux servers.

```
                    [ Cloudflare CDN / HTTPS ]
                                │
                                ▼
                    [ Nginx Reverse Proxy ]
                     │                   │
                     ▼                   ▼
            [ Frontend Static ]    [ FastAPI ASGI ]
            (React 19 / Nginx)    (Uvicorn Workers)
                                         │
                                         ▼
                                   [ Redis 7.2 ]
```

## 2. Docker Production Deployment

```bash
# Pull and build multi-container stack
docker-compose -f docker-compose.yml up -d --build

# Verify container health
docker-compose ps
curl http://localhost:8000/api/v1/health
```

## 3. High-Availability Health Check

- Endpoint: `GET /api/v1/health`
- Alert threshold: Uptime response latency > 500ms
