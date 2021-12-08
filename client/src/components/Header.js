import icHomeWhite from "../assets/ic_home_white.png";
import icDmBlack from "../assets/ic_dm_black.png";
import icPostWhite from "../assets/ic_post_white.png";
import icCompassWhite from "../assets/ic_compass_white.png";
import icHeartWhite from "../assets/ic_heart_white.png";
import logo from "../assets/logo-instagram-text.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="h-54 relative bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-1 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <img className="h-8 w-auto sm:h-10" src={logo} alt="logo image" />
            </a>
          </div>

          <div className="lg:flex-1 flex justify-center items-center">
            <input
              className="form-input w-3/5 px-2 py-1.5 border border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0"
              placeholder="검색"
            />
          </div>

          <nav className="lg:flex-1 hidden md:flex justify-end space-x-4">
            <Link className="relative" to="/main">
              <img src={icHomeWhite} />
            </Link>

            <Link className="relative" to="/dm">
              <img src={icDmBlack} />
            </Link>

            <Link className="relative" to="/new">
              <img src={icPostWhite} />
            </Link>

            <Link className="relative" to="/compass">
              <img src={icCompassWhite} />
            </Link>

            <Link className="relative" to="/heart">
              <img src={icHeartWhite} />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
