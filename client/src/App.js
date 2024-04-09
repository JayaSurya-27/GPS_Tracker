import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WebSocketComponent from "./components/WebSocketComponent.js";
import Home from "./components/Home.js";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} />} />
          <Route path="/map" element={<WebSocketComponent data={data} />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} limit={2} />
    </div>
  );
}

export default App;
