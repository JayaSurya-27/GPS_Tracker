import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 15.484819,
  lng: 74.939076,
};

const busIconUrl =
  "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";

const MapComponent = ({ busPosition }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    // Add other options for async loading as needed
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && busPosition) {
      mapRef.current.panTo(busPosition);
    }
  }, [busPosition]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  console.log("busPosition", busPosition);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      <Marker position={busPosition} />
    </GoogleMap>
  );
};

export default MapComponent;
