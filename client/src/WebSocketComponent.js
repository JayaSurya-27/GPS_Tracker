import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MapComponent from "./Map.js";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const busIconUrl =
  "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 15.484819,
    lgn: 74.939076,
  });

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = new WebSocket("ws://localhost:8000/ws/socket-server/");
    newSocket.onopen = () => {
      console.log("WebSocket connected!");
      setSocket(newSocket);
    };

    // Handle incoming messages
    newSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log("Received message:", messageData);
      setCoordinates({
        lat: messageData.latitude,
        lgn: messageData.longitude,
      });

      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        messageData.message,
      ]);
    };

    // Handle WebSocket errors
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleMessageSend = () => {
    // Send message to WebSocket server
    if (!message.trim() || !socket) return; // Don't send empty messages or if socket is not initialized

    socket.send(JSON.stringify({ message: message }));
    setMessage(""); // Clear input field after sending message
  };

  // return <MapComponent busPosition={coordinates} />;
  return <>
  
  </>;
};

export default ChatComponent;
