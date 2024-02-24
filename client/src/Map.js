import React, { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vh",
  height: "100vh",
};

const center = {
  lat: 15.484819,
  lng: 74.939076,
};

// Define a bus icon URL
const busIconUrl =
  "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState(null);
  const [busPosition, setBusPosition] = useState({
    lat: 15.484284979015744,
    lng: 74.93466373521942,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={busPosition ? busPosition : center}
      zoom={17}
    >
      {/* Marker for the bus */}
      <Marker
        position={busPosition}
        icon={{
          url: busIconUrl,
          scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 50), // Set anchor to bottom center
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
