import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import busIconUrl from "./../static/gps.png";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const defaultCenter = {
  lat: 15.484819,
  lng: 74.939076,
};

// const busIconUrl = "./../public/gps.png";

const WebSocketComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    // Add other options for async loading as needed
  });

  const mapRef = useRef(null);
  const [busPosition, setBusPosition] = useState(null);
  const webSocket = useRef(null);

  useEffect(() => {
    if (isLoaded && !webSocket.current) {
      webSocket.current = new WebSocket(
        "ws://localhost:8000/ws/socket-server/"
      );

      webSocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        setBusPosition({
          lat: data.latitude,
          lng: data.longitude,
        });
      };

      webSocket.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      webSocket.current.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };
    }

    return () => {
      if (webSocket.current) {
        webSocket.current.close();
      }
    };
  }, [isLoaded]);

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
      center={defaultCenter}
      zoom={17}
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

export default WebSocketComponent;
