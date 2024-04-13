import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
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

const Tv = ({ data }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [busPosition, setBusPosition] = useState(null);
  const [latestTimestamp, setLatestTimestamp] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.thingspeak.com/channels/2500568/feeds.json?api_key=3TVTGFNPIZH5T08Y&results=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const apiData = await response.json();
      if (apiData.feeds.length === 0) {
        console.error("No data found in response");
        return;
      }

      const latestEntry = apiData.feeds[0];
      const newLat = parseFloat(latestEntry.field1);
      const newLng = parseFloat(latestEntry.field2);
      setBusPosition({ lat: newLat, lng: newLng });

      const timestamp = new Date(latestEntry.created_at).toLocaleString();
      setLatestTimestamp(timestamp);

      // Set additional details from the data object
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await axios.post(
        "https://gps-tracker-hr6r.onrender.com/apis/get_schedule/",
        {
          bus_id: 2,
          day_id: 1,
          from_location: "clt",
          to_location: "bhoopali",
        }
      );

      console.log("Schedule response:", response);
      if (response.status === 200) {
        setSchedule(response.data.data[0]);
      } else {
        console.error("Error fetching schedule");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSchedule(); // Initial schedule fetch

    const fetchDataInterval = setInterval(fetchData, 5000);
    const fetchScheduleInterval = setInterval(fetchSchedule, 20 * 60 * 1000); // Fetch schedule every 20 minutes

    return () => {
      clearInterval(fetchDataInterval);
      clearInterval(fetchScheduleInterval);
    };
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
          padding: "16px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(130, 146, 250, 0.8)",
        }}
      >
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "1.5em" }}>CLT</span> -{" "}
          <span style={{ fontSize: "1.5em" }}>Bhoopali</span>
        </Typography>
        {schedule && (
          <>
            <Typography variant="body2" style={{ textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>Start Time:</span>{" "}
              {schedule.start_time} -{" "}
              <span style={{ fontWeight: "bold" }}>End Time:</span>{" "}
              {schedule.end_time}
            </Typography>
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Bus Position (Last Updated: {latestTimestamp})
            </Typography>
          </>
        )}
      </Paper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
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
    </div>
  );
};

export default Tv;
