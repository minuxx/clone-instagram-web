import imgProfileBorder from "../../assets/img_profile_border.png";
import imgDefaultProfile from "../../assets/img_default_profile.png";

function Follower({ follower, onSelectUser }) {
  const { id, name, profileImgUrl, isSelected } = follower;

  return (
    <div
      className={`flex flex-row p-4 items-center cursor-pointer ${isSelected ? "bg-gray-100" : "bg-white"}`}
      onClick={() => onSelectUser(follower)}
    >
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
    </div>
  );
}

export default Follower;
