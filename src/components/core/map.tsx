"use client";

import React, { useState, useRef, useEffect, JSX } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import loadMarkers from "@/utils/loadMarkers";

type LatLngExpression = L.LatLngExpression;

// It's good practice to keep this fix for default icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface Marker {
  id: string;
  lat: number;
  long: number;
  type: "food" | "water" | "danger" | "aid";
  description: string;
  image?: string;
  user_id: string;
  last_updated: Date;
  reports: number;
}

interface MapMarker {
  id: number;
  position: LatLngExpression;
  label: string;
}

interface MapClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapInitializerProps {
  mapRef: React.MutableRefObject<L.Map | null>;
}

function MapInitializer({ mapRef }: MapInitializerProps) {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (mapRef.current) {
        loadMarkers(mapRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      mapRef.current = null;
    };
  }, [map, mapRef]);

  return null;
}

export default function MapComponent(): JSX.Element {
  const defaultPosition: LatLngExpression = [31.5017, 34.4668];

  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [mapCenter, setMapCenter] =
    useState<LatLngExpression>(defaultPosition);
  const [zoom, setZoom] = useState<number>(13);

  const mapRef = useRef<L.Map | null>(null);

  const handleMapClick = (lat: number, lng: number) => {};

  const removeMarker = (id: number) => {
    setMarkers((p) => p.filter((m) => m.id !== id));
  };

  const centerOnMarker = (position: LatLngExpression) => {
    setMapCenter(position);
    setZoom(15);
    mapRef.current?.invalidateSize();
  };

  const resetView = () => {
    setMapCenter(defaultPosition);
    setZoom(13);
    mapRef.current?.invalidateSize();
  };

  const clearAllMarkers = () => setMarkers([]);

  useEffect(() => {
    const handler = () => {
      mapRef.current?.invalidateSize();
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="w-full">
      <div
        className="relative rounded-lg overflow-hidden shadow-lg border border-gray-300"
        style={{ height: "calc(100vh - 70px)", minHeight: "300px" }}
      >
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapInitializer mapRef={mapRef} />

          <MapClickHandler onMapClick={handleMapClick} />
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800">
                    {marker.label}
                  </h3>
                  <div className="mt-2 flex gap-2 justify-center">
                    <button
                      onClick={() => centerOnMarker(marker.position)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Center Here
                    </button>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div
          style={{ position: "absolute", top: 8, right: 8, zIndex: 999 }}
        >
          <div className="space-x-2">
            <button
              onClick={resetView}
              className="px-3 py-1 bg-white border rounded shadow-sm text-sm"
            >
              Reset
            </button>
            <button
              onClick={() => clearAllMarkers()}
              className="px-3 py-1 bg-white border rounded shadow-sm text-sm"
            >
              Clear markers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}