"use client";

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const markerIcon = new Icon({
  iconUrl: "/static/marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface FixedMapProps {
  center: [number, number]; // Map center coordinates
  markerPosition: [number, number]; // Marker position coordinates
}

export default function FixedMap({ center, markerPosition }: FixedMapProps) {
  return (
    <div className="map-container z-0">
      <MapContainer
        center={center}
        zoom={16}
        minZoom={3}
        maxZoom={17}
        className="w-[100%] h-[85vh] rounded-lg border z-0"
        // dragging={false} // Disable dragging
        zoomControl={true} // Enable zoom controls
        scrollWheelZoom={true} // Allow zooming with the scroll wheel
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition} icon={markerIcon}></Marker>
      </MapContainer>
    </div>
  );
}
