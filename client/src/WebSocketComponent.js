import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 15.484819,
    lng: 74.939076,
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
      setCoordinates({ lat: messageData.latitude, lng: messageData.longitude });
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        messageData.message,
        `Latitude: ${messageData.latitude}, Longitude: ${messageData.longitude}`, // Include latitude and longitude in the received message
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

  return <MapComponent busPosition={coordinates} />;
};

export default ChatComponent;
