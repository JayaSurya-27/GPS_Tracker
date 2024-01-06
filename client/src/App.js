import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationTracker from "./nav.js";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <ApiState> */}
        <Routes>
          <Route path="/" element={<LocationTracker />} />
        </Routes>
        {/* </ApiState> */}
      </Router>
    </div>
  );
}

export default App;
