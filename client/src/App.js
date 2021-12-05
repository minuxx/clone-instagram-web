import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
