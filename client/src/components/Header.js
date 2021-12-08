import icHomeWhite from "../assets/ic_home_white.png";
import icDmBlack from "../assets/ic_dm_black.png";
import icPostWhite from "../assets/ic_post_white.png";
import icCompassWhite from "../assets/ic_compass_white.png";
import icHeartWhite from "../assets/ic_heart_white.png";
import logo from "../assets/logo-instagram-text.png";

function Header() {
  return (
    <div className="flex max-w-screen-md justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <a href="#">
          <img className="h-8 w-auto sm:h-10" src={logo} alt="logo image" />
        </a>
      </div>

      <input placeholder="검색" />

      <nav className="hidden md:flex space-x-10">
        <img className="relative" src={icHomeWhite} />
        <img className="relative" src={icDmBlack} />
        <img className="relative" src={icPostWhite} />
        <img className="relative" src={icCompassWhite} />
        <img className="relative" src={icHeartWhite} />
      </nav>
    </div>
  );
}

export default Header;
