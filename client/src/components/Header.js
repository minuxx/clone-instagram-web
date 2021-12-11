import icHomeWhite from "../assets/ic_home_white.png";
import icHomeBlack from "../assets/ic_home_black.png";
import icMsgWhite from "../assets/ic_message_white.png";
import icMsgBlack from "../assets/ic_message_black.png";
import icPostWhite from "../assets/ic_post_white.png";
import icPostBlack from "../assets/ic_post_black.png";
import icHeartWhite from "../assets/ic_heart_white.png";
import icHeartBlack from "../assets/ic_heart_black.png";
import logo from "../assets/logo-instagram-text.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearLoginStorage } from "../utils/storage";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogOut = () => {
    clearLoginStorage();
    navigate("/");
  };

  return (
    <div className="h-54 relative bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-1 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link className="relative" to="/home">
              <img className="h-8 w-auto sm:h-10" src={logo} alt="logo image" />
            </Link>
          </div>

          <div className="lg:flex-1 flex justify-center items-center">
            <input
              className="form-input w-3/5 px-2 py-1.5 border border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0"
              placeholder="검색"
            />
          </div>

          <nav className="lg:flex-1 hidden md:flex justify-end space-x-4">
            <Link className="relative" to="/home">
              <img src={location.pathname == "/home" ? icHomeBlack : icHomeWhite} />
            </Link>

            <Link className="relative" to="/msg">
              <img src={location.pathname == "/msg" ? icMsgBlack : icMsgWhite} />
            </Link>

            <Link className="relative" to="/new">
              <img src={location.pathname == "/new" ? icPostBlack : icPostWhite} />
            </Link>

            <Link className="relative" to="/follow">
              <img src={location.pathname == "/follow" ? icHeartBlack : icHeartWhite} />
            </Link>
            <div className="flex text-blue-300 items-center cursor-pointer hover:text-blue-400" onClick={onLogOut}>
              Log out
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
