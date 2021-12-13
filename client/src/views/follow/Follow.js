import { getFollowsApi } from "../../apis/follow";
import { useEffect, useState } from "react";
import User from "./User";

function Follow() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getFollows();
  }, []);

  const getFollows = async () => {
    const res = await getFollowsApi();

    console.log(res);
    handleResponse(res);
  };

  const handleResponse = (res) => {
    switch (res.code) {
      case 200:
        setUsers([...res.result.users]);
        break;
      default:
        console.log(res.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-lg font-bold mb-4">회원님을 위한 추천</h1>
      <div className="border-2 bg-white p-3">
        {users.map((user) => (
          <User user={user} getFollows={getFollows} />
        ))}
      </div>
    </div>
  );
}

export default Follow;
