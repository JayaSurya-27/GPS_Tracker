import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import WebSocketComponent from "./WebSocketComponent.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WebSocketComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
