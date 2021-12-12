import imgProfileBorder from "../../assets/img_profile_border.png";
import imgDefaultProfile from "../../assets/img_default_profile.png";

function User({ user }) {
  const { id, name, profileImgUrl, isFollowing } = user;

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
        <div className="font-semibold leading-4">{id}</div>
        <div className="font-medium text-gray-200 leading-4">{name}</div>
      </div>

      <div
        className={`font-semibold ml-auto px-2.5 py-1.5 rounded cursor-pointer ${
          isFollowing ? "text-black bg-white border" : "text-white bg-blue-400"
        } `}
      >
        {isFollowing ? "팔로잉" : "팔로우"}
      </div>
    </div>
  );
}

export default User;
