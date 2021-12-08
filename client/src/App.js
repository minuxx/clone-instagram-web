import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import Layout from "./layout/Layout";
import "./index.css";
import Header from "./components/Header";
import { checkLogin } from "./utils/storage/storageManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={checkLogin() ? <Header /> : <Login />} />
        <Route exact path="/account" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
