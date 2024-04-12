import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import busIconUrl from "./../static/gps.png";

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "90vh",
  overflow: "hidden",
};

const defaultCenter = {
  lat: 15.484819,
  lng: 74.939076,
};

const API_END_POINT = process.env.REACT_APP_API_KEY;

const MapComponent = ({ data }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [busPosition, setBusPosition] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_END_POINT}/apis/bus_location/2/`);

      console.log("Response:", response);
      if (response.status !== 200) {
        console.error("Invalid response status:", response.status);
        return;
      }

      const data = await response.json();
      console.log("Data fetched:", data);

      const newLat = parseFloat(data.data.latitude);
      const newLng = parseFloat(data.data.longitude);

      if (!isNaN(newLat) && !isNaN(newLng)) {
        setBusPosition({ lat: newLat, lng: newLng });
      } else {
        console.error("Invalid latitude or longitude received:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const fetchDataInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    if (mapRef.current && busPosition) {
      mapRef.current.panTo(busPosition);
    }
  }, [busPosition]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Paper
        elevation={3}
        style={{
          padding: "0px",
          height: "6vh",
          zIndex: 1000,
        }}
      >
        <Typography variant="body1">Bus Position</Typography>
      </Paper>
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
    </div>
  );
};

export default MapComponent;
