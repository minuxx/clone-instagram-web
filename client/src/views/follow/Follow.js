import User from "./User";

function Follow() {
  const users = [
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: false },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
    { id: "minuxx", name: "minuk hi", profileImgUrl: null, isFollowing: true },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-lg font-bold mb-4">회원님을 위한 추천</h1>
      <div className="border-2 bg-white p-3">
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}

export default Follow;
