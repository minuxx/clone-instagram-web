import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import Layout from "./layout/Layout";
import "./index.css";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/account" element={<Join />} />
<<<<<<< HEAD
        <Route path="/main" element={<Layout />}></Route>
=======
        <Route path="/home" element={<Header />}></Route>
>>>>>>> 47c88c8b5c41a6f9346b15771b88af47099c7497
      </Routes>
    </BrowserRouter>
  );
}

export default App;
