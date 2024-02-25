import React, { useState, useCallback, useEffect, memo } from "react";
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

function calculateRotationAngle(prevPosition, newPosition) {
  if (!prevPosition || !newPosition) return 0;

  const lat1 = prevPosition.lat;
  const lon1 = prevPosition.lng;
  const lat2 = newPosition.lat;
  const lon2 = newPosition.lng;

  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  const brng = Math.atan2(y, x);
  const angle = (brng * 180) / Math.PI;
  return angle;
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState(null);
  const [busPosition, setBusPosition] = useState({
    lat: 15.484284979015744,
    lng: 74.93466373529942,
  });
  const [prevBusPosition, setPrevBusPosition] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Update rotation angle when bus position changes
  useEffect(() => {
    const angle = calculateRotationAngle(prevBusPosition, busPosition);
    setRotationAngle(angle);
    setPrevBusPosition(busPosition);
  }, [busPosition]);

  // Function to fetch bus location
  const fetchBusLocation = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/apis/bus_location/2/"
      );
      if (response.ok) {
        const data = await response.json();
        const { latitude, longitude } = data.data;
        setBusPosition({ lat: latitude, lng: longitude });
      } else {
        console.error("Failed to fetch bus location");
      }
    } catch (error) {
      console.error("Error fetching bus location:", error);
    }
  }, []);

  // Fetch bus location initially and then every 10 seconds
  useEffect(() => {
    fetchBusLocation(); // Fetch initially
    const interval = setInterval(fetchBusLocation, 2000); // Fetch every 10 seconds
    return () => clearInterval(interval); // Cleanup
  }, [fetchBusLocation]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={busPosition ? busPosition : center}
      zoom={17}
    >
      <Marker
        position={busPosition}
        icon={{
          url: busIconUrl,
          scaledSize: new window.google.maps.Size(50, 50), // Adjust size as needed
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 25), // Set anchor to center
          rotation: rotationAngle, // Set rotation angle
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
