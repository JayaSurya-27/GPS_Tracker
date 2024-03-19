import React, { useState } from "react";
import WebSocketComponent from "./WebSocketComponent";
import MapComponent from "./MapComponent";

const Map = () => {
  const [busPosition, setBusPosition] = useState(null);

  const handleWebSocketMessage = (data) => {
    setBusPosition({
      lat: data.latitude,
      lng: data.longitude,
    });
  };

  return (
    <div>
      <WebSocketComponent onMessage={handleWebSocketMessage} />
      <MapComponent busPosition={busPosition} />
    </div>
  );
};

export default Map;
