import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import Main from "./views/pages/Main";
import Error from "./views/pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Main />} />
        <Route exact path="/account" element={<Join />} />
        <Route exact path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
