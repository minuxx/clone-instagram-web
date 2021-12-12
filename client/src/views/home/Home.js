import { useContext, useEffect, useState } from "react";
import { getPostsApi } from "../../apis/post";
import Post from "./Post";
import { SearchContext } from "../pages/Main";

function Home() {
  const searchStore = useContext(SearchContext);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getPosts();
    searchStore.getPosts = getPosts;
  }, []);

  const getPosts = async () => {
    const res = await getPostsApi(searchStore.filter, searchStore.value);

    console.log(res);

    handleResponse(res);
  };

  const handleResponse = (res) => {
    switch (res.code) {
      case 200:
        setPosts([...res.result.posts]);
        break;
      default:
        alert(res.message);
    }
  };

  const onSetFilter = (e) => {
    searchStore.filter = e.target.id;

    if (searchStore.filter == "all") {
      searchStore.value = "";
      searchStore.setSearch();

      getPosts();
    }

    setFilter(e.target.id);
  };

  const onSearchWriterOrHashtag = (filter, value) => {
    searchStore.filter = filter;
    searchStore.value = value;
    // console.log(`filter: ${filter}, value: ${value}`);

    if (searchStore.setSearch != null) {
      searchStore.setSearch();
    }

    setFilter(filter);
    getPosts();
  };

  return (
    <div>
      <div className="inline-flex flex-row items-center rounded-md bg-gray-300 mb-4">
        <div
          className={`${filter == "all" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="all"
          onClick={onSetFilter}
        >
          ALL
        </div>
        <div
          className={`${filter == "writer" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="writer"
          onClick={onSetFilter}
        >
          작성자
        </div>
        <div
          className={`${filter == "hashtag" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="hashtag"
          onClick={onSetFilter}
        >
          해시태그
        </div>
        <div
          className={`${filter == "content" ? "bg-blue-500" : null} w-20 text-center text-white rounded-md p-1.5 font-bold cursor-pointer`}
          id="content"
          onClick={onSetFilter}
        >
          내용
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post.idx} post={post} onSearchWriterOrHashtag={onSearchWriterOrHashtag} />
        ))}
      </div>
    </div>
  );
}

export default Home;
