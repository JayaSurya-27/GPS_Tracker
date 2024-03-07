import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  AdvancedMarkerElement,
  Marker,
} from "@react-google-maps/api";

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
    googleMapsApiKey: "YOUR_API_KEY",
    // Add other options for async loading as needed
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && busPosition) {
      mapRef.current.panTo(busPosition);
    }
  }, [busPosition]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {busPosition && (
        <Marker
          position={busPosition}
          options={{
            icon: {
              url: busIconUrl,
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
              rotation: 180,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
