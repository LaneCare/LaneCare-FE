"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface FlyToMarkerProps {
  position: [number, number];
  zoomLevel?: number;
}

const FlyToMarker = ({ position, zoomLevel }: FlyToMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      const zoom = zoomLevel ?? map.getZoom();
      map.flyTo(position, zoom, {
        duration: 1, // Duration in seconds
      });
    }
  }, [map, position, zoomLevel]);

  return null;
};

export default FlyToMarker;
