import Follower from "./Follower";
import icEmoji from "../../assets/ic_emoji.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../pages/Main";
import { getFollowersApi } from "../../apis/follow";
import { getMessagesApi } from "../../apis/message";

function Message() {
  const userStore = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getFollowers();
  }, []);

  const getFollowers = async () => {
    const res = await getFollowersApi(userStore.name);

    console.log(res);

    handleResponse(res);
  };

  const handleResponse = (res) => {
    switch (res.code) {
      case 200:
        const _followers = res.result.followers.map((follower) => ({ ...follower, isSelected: false }));

        setFollowers([..._followers]);
        break;
      default:
        alert(res.message);
    }
  };

  const onSelectUser = useCallback(
    (user) => {
      setFollowers(
        followers.map((follower) =>
          follower.id === user.id ? { ...follower, isSelected: !follower.isSelected } : { ...follower, isSelected: false },
        ),
      );
      setSelectedUser(user);
      getMessages(user.id);
    },
    [followers],
  );

  const getMessages = async (id) => {
    const res = await getMessagesApi(id);

    console.log(res);

    handleResponseOnMessage(res);
  };

  const handleResponseOnMessage = (res) => {
    switch (res.code) {
      case 200:
        setFollowers([...res.result.messages]);
        break;
      default:
        alert(res.message);
    }
  };

  return (
    <div className="flex flex-row bg-white min-h-screen">
      <div className="flex flex-col w-2/5">
        <div className="flex flex-row justify-center items-center h-14 font-semibold border">{userStore.name}</div>
        <div className="flex-1 overflow-y-auto border border-t-0 max-h-screen">
          {followers.map((user, index) => (
            <Follower key={index} follower={user} onSelectUser={onSelectUser} />
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 border border-l-0 border-t-0">
        <div className="flex flex-row justify-start items-center h-14 font-extrabold border border-l-0 border-r-0 pl-4">
          {selectedUser === null ? "" : `${selectedUser.name}님`}
        </div>

        <div className="flex-1"></div>

        <div className="flex flex-row items-center border border-gray-200 rounded-2xl p-1.5 m-4">
          <img src={icEmoji} className="w-8 h-8" />
          <textarea
            className="flex-1 border-0 bg-transparent focus:ring-transparent resize-none  p-1.5 overflow-hidden min-h-8 h-8 mr-2"
            placeholder="메세지 입력..."
            maxLength={2200}
            name="message"
          ></textarea>
          <div className="text-blue-500 font-semibold cursor-pointer">보내기</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
