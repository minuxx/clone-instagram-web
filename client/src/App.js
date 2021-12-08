import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import "./index.css";
import Main from "./views/pages/Main";
import { checkLogin } from "./utils/storage/storageManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={checkLogin() ? <Main /> : <Login />} />
        <Route exact path="/account" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
