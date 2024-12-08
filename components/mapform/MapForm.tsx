"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { UseFormReturn } from "react-hook-form";

const markerIcon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultMapCenter: [number, number] = [-6.3700992, 106.8302336];

interface MapFormProps {
  defaultMarkerPosition?: [number, number]; // Optional prop for default marker position
  form: UseFormReturn<
    {
      name: string;
      description: string;
      image: File;
      latitude: number;
      longitude: number;
    },
    any,
    undefined
  >;
}

export default function MapForm({ defaultMarkerPosition, form }: MapFormProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    defaultMarkerPosition || null
  );

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);

        form.setValue("latitude", lat);
        form.setValue("longitude", lng);
      },
    });
    return null;
  };

  return (
    <div className="map-container z-0">
      <MapContainer
        center={markerPosition || defaultMapCenter}
        zoom={16}
        minZoom={3}
        maxZoom={17}
        className="w-[100%] h-[70vh] rounded-lg border z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {markerPosition && (
          <Marker position={markerPosition} icon={markerIcon}></Marker>
        )}
      </MapContainer>
    </div>
  );
}
