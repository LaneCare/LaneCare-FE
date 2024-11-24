"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { ReportUserLogJoinType, UserReportJoinType } from "@/lib/types/types";
import FlyToMarker from "./FlyToMarker";

const legalIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const markerIcon = new Icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const defaultPosition: [number, number] = [-6.3700992, 106.8302336];

interface MapProps {
  data: ReportUserLogJoinType[];
  activeReport: ReportUserLogJoinType | null;
  setActiveReport: React.Dispatch<
    React.SetStateAction<ReportUserLogJoinType | null>
  >;
}

export default function Map({ data, activeReport, setActiveReport }: MapProps) {
  const handleMarkerClick = (report: ReportUserLogJoinType) => {
    setActiveReport(report);
  };

  return (
    <div className="map-container z-0">
      <MapContainer
        center={defaultPosition}
        zoom={16}
        minZoom={3}
        maxZoom={17}
        className="w-[100%] h-[85vh] rounded-lg border z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((report) => (
          <Marker
            key={report.reportid}
            position={[report.latitude, report.longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => handleMarkerClick(report),
            }}
          >
            <Popup>
              <strong>Name:</strong> {report.username} <br />
              <strong>Latitude:</strong> {report.latitude} <br />
              <strong>Longitude:</strong> {report.longitude} <br />
              <strong>Address:</strong> {report.street} <br />
              <strong>Description:</strong> {report.description} <br />
              <strong>Timestamp:</strong>{" "}
              {new Date(report.timestamp).toLocaleString()} <br />
              <ul>
                {report.logs.map((log, index) => (
                  <li key={index}>
                    <strong>Log {index + 1}:</strong> <br />
                    <strong>Status:</strong> {log.status} <br />
                    <strong>Comments:</strong> {log.comments || "No comments"}{" "}
                    <br />
                    <strong>Change Time:</strong>{" "}
                    {new Date(log.changetime).toLocaleString()}
                  </li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}

        {activeReport && (
          <FlyToMarker
            position={[activeReport.latitude, activeReport.longitude]}
            zoomLevel={17}
          />
        )}
      </MapContainer>
    </div>
  );
}
