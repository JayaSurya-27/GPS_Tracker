import React from "react";
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
    googleMapsApiKey: "AIzaSyDPWQbcoRWvxocWWkWyxUNXxOuWSuGwTxo",
  });

  const [map, setMap] = React.useState(null);
  const [busPosition, setBusPosition] = React.useState(center);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Function to update bus position
  //   const updateBusPosition = () => {
  //     // Simulating bus movement (Replace with actual logic to update bus position)
  //     const newPosition = {
  //       lat: busPosition.lat + 0.0001,
  //       lng: busPosition.lng + 0.0001,
  //     };
  //     setBusPosition(newPosition);
  //   };

  //   React.useEffect(() => {
  //     // Update bus position every 2 seconds (Adjust timing as needed)
  //     const interval = setInterval(updateBusPosition, 2000);
  //     return () => clearInterval(interval);
  //   }, [busPosition]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
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

export default React.memo(MyComponent);
