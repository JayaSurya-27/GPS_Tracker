import React, { useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 15.484819,
  lng: 74.939076,
};

// const busIconUrl =
//   "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";

const busIconUrl = "./../public/gps.png";

const MapComponent = ({ busPosition }) => {
  console.log(busPosition);
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

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {busPosition && (
        <Marker
          position={busPosition}
          icon={{
            url: busIconUrl,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
