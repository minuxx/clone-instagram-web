import imgProfileBorder from "../../assets/img_profile_border.png";
import imgDefaultProfile from "../../assets/img_default_profile.png";
import { cancelfollowingApi, followingApi } from "../../apis/follow";

function User({ user, getFollows }) {
  const { id, name, profileImgUrl, Followers } = user;

  const handleFollowing = async () => {
    let res;
    if (Followers.length == 0) {
      res = await followingApi({ id });
    } else {
      res = await cancelfollowingApi(id);
    }

    handleResponse(res);
  };

  const handleResponse = (res) => {
    switch (res.code) {
      case 200:
        console.log(res.message);
        getFollows();
        break;
      default:
        console.log(res.message);
    }
  };

  return (
    <div className="flex flex-row p-2 items-center">
      <div className="flex relative w-10 h-10 mr-2 justify-center items-center">
        <img className="absolute" src={imgProfileBorder} alt="profile border image" />
        <img
          className="absolute w-9 h-9 rounded-full"
          src={profileImgUrl != null ? profileImgUrl : imgDefaultProfile}
          alt="profile image"
        />
      </div>

      <div className="flex flex-col">
        <div className="font-semibold leading-6">{id}</div>
        <div className="font-normal text-sm text-gray-300 leading-4">{name}</div>
      </div>

      <div
        className={`font-semibold ml-auto px-2.5 py-1.5 rounded cursor-pointer ${
          Followers.length == 0 ? "text-white bg-blue-400" : "text-black bg-white border"
        } `}
        onClick={handleFollowing}
      >
        {Followers.length == 0 ? "팔로우" : "팔로잉"}
      </div>
    </div>
  );
}

export default User;
