import { useEffect, useState } from "react";
import { getPostsApi } from "../../apis/post";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const onFilter = (e) => {
    setFilter(e.target.id);
  };

  return (
    <div>
      <div className="inline-flex flex-row items-center rounded-md bg-gray-300">
        <div
          className={`${filter == "all" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="all"
          onClick={onFilter}
        >
          ALL
        </div>
        <div
          className={`${filter == "writer" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="writer"
          onClick={onFilter}
        >
          작성자
        </div>
        <div
          className={`${filter == "hashtag" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="hashtag"
          onClick={onFilter}
        >
          해시태그
        </div>
        <div
          className={`${filter == "content" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="content"
          onClick={onFilter}
        >
          내용
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post.idx} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
