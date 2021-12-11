import { useEffect } from "react";
import { getPostsApi } from "../../apis/post";
import Feed from "./Feed";

function Home() {
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await getPostsApi();
    console.log(posts);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
}

export default Home;
