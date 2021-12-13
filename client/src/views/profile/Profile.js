import { useContext } from "react";
import { UserContext } from "../pages/Main";

function Profile() {
  const userStore = useContext(UserContext);

  return (
    <div className="bg-white border rounded-md p-4">
      <div className="text-lg font-bold mb-4">{userStore.id} 프로필</div>
      <div className="font-bold mb-2">Date and Time: {Date()}</div>
      <div className="font-semibold">followings: {userStore.followings}</div>
      <div className="font-semibold">followers: {userStore.followers}</div>
    </div>
  );
}

export default Profile;
