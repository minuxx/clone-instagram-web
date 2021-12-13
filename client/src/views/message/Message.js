import User from "./User";
import icEmoji from "../../assets/ic_emoji.png";

function Message() {
  const users = [
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: false,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: false,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
    {
      name: "김다정",
      profileImgUrl: null,
      isSelected: true,
    },
  ];

  const messages = [{ content: "hi" }];

  return (
    <div className="flex flex-row bg-white min-h-screen">
      <div className="flex flex-col w-2/5">
        <div className="flex flex-row justify-center items-center h-14 font-semibold border">유민욱</div>
        <div className="overflow-y-auto border max-h-screen">
          {users.map((user) => (
            <User user={user} />
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 border border-l-0 border-t-0">
        <div className="flex flex-row justify-start items-center h-14 font-extrabold border border-l-0 pl-4">유민욱님</div>

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
