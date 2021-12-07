import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import Layout from "./layout/Layout";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/account" element={<Join />} />
        <Route path="/main" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
