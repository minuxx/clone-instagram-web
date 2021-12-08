import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home/Home";
import Message from "../views/message/Message";

function Content() {
  return (
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/msg" element={<Message />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </div>
    </main>
  );
}

export default Content;
