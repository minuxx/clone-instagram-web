import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import "./index.css";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/account" element={<Join />} />
        <Route path="/home" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
