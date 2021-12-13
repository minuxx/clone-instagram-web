import imgDefaultProfile from "../../assets/img_default_profile.png";

function MBox({ receiver, content }) {
  return (
    <div className="flex flex-row mb-2">
      {receiver && (
        <img
          className="w-9 h-9 rounded-full mr-1"
          src={receiver.profileImgUrl != null ? receiver.profileImgUrl : imgDefaultProfile}
          alt="profile image"
        />
      )}

      <div
        className={`break-all h-auto text-sm p-3 rounded-2xl max-w-xl  ${
          receiver == null ? "bg-gray-300 ml-auto" : "bg-white border border-gray-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default MBox;
