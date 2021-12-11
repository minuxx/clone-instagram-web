import { useEffect, useState } from "react";
import { getPostsApi } from "../../apis/post";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const res = await getPostsApi();

    handleResponse(res);
  };

  const handleResponse = (res) => {
    switch (res.code) {
      case 200:
        setPosts((cur) => [...cur, ...res.result.posts]);
        break;
      default:
        alert(res.message);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post key={post.idx} post={post} />
      ))}
    </div>
  );
}

export default Home;
