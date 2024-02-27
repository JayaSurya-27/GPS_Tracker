import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Import from "react-dom"

const WebSocketComponent = () => {
  const [htmlContent, setHtmlContent] = useState(""); // Initialize htmlContent state

  const API_END_POINT = process.env.API_END_POINT || "localhost:8000/";

  useEffect(() => {
    const socket = new WebSocket(`ws://${API_END_POINT}ws/socket-server/`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.html_content);
      if (data.type === "html_response") {
        setHtmlContent(data.html_content); // Set HTML content received from WebSocket
      }
    };

    return () => {
      socket.close();
    };
  }, [API_END_POINT]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> // Render HTML content safely
  );
};

export default WebSocketComponent;
