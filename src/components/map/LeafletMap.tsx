import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix standard Leaflet marker icon URLs
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export interface MapMarker {
  lat: number;
  lng: number;
  popupTitle?: string;
  popupContent?: string;
  isCenter?: boolean;
}

export interface MapPolygon {
  id: string | number;
  positions: [number, number][];
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  dashArray?: string;
  popupTitle?: string;
  popupContent?: string;
  onClick?: () => void;
}

export interface MapCircle {
  lat: number;
  lng: number;
  radius: number; // in meters
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  polygons?: MapPolygon[];
  circles?: MapCircle[];
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function LeafletMap({
  center,
  zoom = 13,
  markers = [],
  polygons = [],
  circles = [],
  onMapClick,
  className = '',
  style = {}
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // If map already exists, clean up
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    });

    // Primary OpenStreetMap Tile Layer
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    osmLayer.addTo(map);

    // Layer group for dynamic items (markers, polygons, circles)
    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;

    // Map Click Listener
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    });

    mapInstanceRef.current = map;

    // Invalidate size after short delay to ensure perfect rendering in all layouts
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run on mount

  // Fly to new center or zoom when center changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(center, zoom, { duration: 0.8 });
      mapInstanceRef.current.invalidateSize();
    }
  }, [center[0], center[1], zoom]);

  // Update Markers, Polygons, and Circles dynamically
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const group = layerGroupRef.current;
    group.clearLayers();

    // 1. Render Circles
    circles.forEach(c => {
      const circle = L.circle([c.lat, c.lng], {
        radius: c.radius,
        color: c.color || '#10b981',
        fillColor: c.fillColor || '#10b981',
        fillOpacity: c.fillOpacity ?? 0.2,
        weight: 2
      });
      circle.addTo(group);
    });

    // 2. Render Polygons
    polygons.forEach(p => {
      const polygon = L.polygon(p.positions, {
        color: p.color || '#10b981',
        fillColor: p.fillColor || p.color || '#10b981',
        fillOpacity: p.fillOpacity ?? 0.3,
        weight: p.weight ?? 2,
        dashArray: p.dashArray
      });

      if (p.popupTitle || p.popupContent) {
        polygon.bindPopup(`
          <div style="font-family: inherit; padding: 4px; font-size: 12px;">
            ${p.popupTitle ? `<strong style="display:block; color: #1e293b; margin-bottom: 2px;">${p.popupTitle}</strong>` : ''}
            ${p.popupContent ? `<div style="color: #475569;">${p.popupContent}</div>` : ''}
          </div>
        `);
      }

      if (p.onClick) {
        polygon.on('click', () => {
          p.onClick?.();
        });
      }

      polygon.addTo(group);
    });

    // 3. Render Markers
    markers.forEach(m => {
      const marker = L.marker([m.lat, m.lng]);

      if (m.popupTitle || m.popupContent) {
        marker.bindPopup(`
          <div style="font-family: inherit; padding: 4px; font-size: 12px; min-width: 140px;">
            ${m.popupTitle ? `<strong style="display:block; color: #10b981; font-size: 13px; margin-bottom: 3px;">${m.popupTitle}</strong>` : ''}
            ${m.popupContent ? `<div style="color: #334155; line-height: 1.4;">${m.popupContent}</div>` : ''}
          </div>
        `);
      }

      marker.addTo(group);
    });
  }, [markers, polygons, circles]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full min-h-[350px] ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '350px',
        backgroundColor: '#e5e7eb',
        zIndex: 1,
        ...style
      }}
    />
  );
}
