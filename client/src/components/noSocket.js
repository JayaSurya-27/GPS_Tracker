import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import busIconUrl from "./../static/gps.png";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const defaultCenter = {
  lat: 15.484819,
  lng: 74.939076,
};

const API_ENDPOINT = "http://localhost:8000/apis/bus_location/2/";

const MapComponent = ({ data }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [busPosition, setBusPosition] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Data fetched:", data);

      // Ensure that latitude and longitude are valid numbers
      const newLat = parseFloat(data.data.latitude);
      const newLng = parseFloat(data.data.longitude);

      if (!isNaN(newLat) && !isNaN(newLng)) {
        // Update busPosition only if coordinates are valid
        setBusPosition({ lat: newLat, lng: newLng });
      } else {
        console.error("Invalid latitude or longitude received:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Setup interval to fetch data every 5 seconds
    const fetchDataInterval = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(fetchDataInterval);
  }, []); // Only run once on component mount

  useEffect(() => {
    // Pan map to bus position when it updates
    if (mapRef.current && busPosition) {
      mapRef.current.panTo(busPosition);
    }
  }, [busPosition]); // Trigger when busPosition changes

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;
  console.log(data);
  return (
    <>
      <div>
        <Paper elevation={3} style={{ padding: "10px", marginBottom: "20px" }}>
          <Typography variant="body1">Bus Position</Typography>
        </Paper>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={17}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {/* Render Marker if busPosition is valid */}
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
    </>
  );
};

export default MapComponent;
