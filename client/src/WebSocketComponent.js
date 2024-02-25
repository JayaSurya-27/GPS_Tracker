// import React, { useEffect, useState } from "react";

// const WebSocketComponent = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const API_END_POINT = process.env.API_END_POINT || "localhost:8000";

//   useEffect(() => {
//     // Create a new WebSocket connection
//     const ws = new WebSocket(`ws://${API_END_POINT}/ws/socket-server/`);

//     // Event listener for when the connection is opened
//     ws.onopen = () => {
//       console.log("Connected to WebSocket server");
//     };

//     // Event listener for when a message is received from the server
//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     // Event listener for when an error occurs
//     ws.onerror = (error) => {
//       console.error("WebSocket error: ", error);
//     };

//     // Event listener for when the connection is closed
//     ws.onclose = () => {
//       console.log("Connection to WebSocket server closed");
//     };

//     // Clean up function to close the WebSocket connection when the component is unmounted
//     return () => {
//       ws.close();
//     };
//   }, []);

//   // Function to send a message to the WebSocket server
//   const sendMessage = (message) => {
//     if (socket) {
//       socket.send(JSON.stringify(message));
//     }
//   };

//   return (
//     <div>
//       <h1>WebSocket Example</h1>
//       <div>
//         <button onClick={() => sendMessage({ text: "Hello, WebSocket!" })}>
//           Send Message
//         </button>
//       </div>
//       <div>
//         <h2>Received Messages:</h2>
//         <ul>
//           {messages.map((message, index) => (
//             <li key={index}>{message.text}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WebSocketComponent;
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
