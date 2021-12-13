import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home/Home";
import Message from "../views/message/Message";
import Post from "../views/post/Post";
import Follow from "../views/follow/Follow";
import Profile from "../views/profile/Profile";

function Content() {
  return (
    <main className="container">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/msg" element={<Message />} />
          <Route path="/new" element={<Post />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </div>
    </main>
  );
}

export default Content;
