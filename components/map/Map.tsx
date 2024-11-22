"use client";
import { Icon, marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

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

export default function Map() {
  return (
    <MapContainer
      className="w-[70%] h-[95vh] rounded-lg border border-black"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={markerIcon} position={[-6.277005, 106.7676015]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
