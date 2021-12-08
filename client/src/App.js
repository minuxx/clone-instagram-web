import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/pages/Login";
import Join from "./views/pages/Join";
import "./index.css";
import Main from "./views/pages/Main";
import Error from "./views/pages/Error";
import { checkLogin } from "./utils/storage/storageManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route exact path="/account" element={<Join />} />
        <Route exact path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
