import React, { useState, useEffect } from "react";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [socket, setSocket] = useState(null);

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

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {receivedMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatComponent;
