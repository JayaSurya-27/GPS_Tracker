import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import WebSocketComponent from "./components/WebSocketComponent.js";
import Home from "./components/Home.js";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<WebSocketComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
