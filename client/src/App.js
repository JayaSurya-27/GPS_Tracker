import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationTracker from "./nav.js";
// import Testing from "./testing.js";
import Map from "./Map.js";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <ApiState> */}
        <Routes>
          <Route path="/" element={<Map />} />
          {/* <Route path="/testing" element={<Testing />} /> */}
        </Routes>
        {/* </ApiState> */}
      </Router>
    </div>
  );
}

export default App;
