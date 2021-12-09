import imgProfileBorder from "../../assets/img_profile_border.png";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCallback } from "react";

const MSlider = styled(Slider)`
  .slick-prev {
    left: 3px;
    z-index: 1;
  }
  .slick-next {
    right: 3px;
    z-index: 1;
  }
  .slick-dots {
    bottom: -20px;
  }
  .slick-dots li {
    width: 10px;
  }
  .slick-dots li.slick-active button:before {
    color: #0095f6;
  }
  .slick-dots li button:before {
    color: #a8a8a8;
  }
  .slick-dots li.slick-active button:hover {
    color: #a8a8a8;
  }
`;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Feed() {
  const feed = {
    id: "minux",
    location: "서울, 강남",
    profileUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/200710_%ED%95%9C%EC%86%8C%ED%9D%AC.png",
    date: "2021-12-03",
    content:
      "안녕하세요.ddd안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요dddddddd.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요ddddd.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.ddddddddd안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.",
    hashtags: ["hi", "dm", "한소희", "instagram", "안녕", "good", "hi", "dm", "한소희", "instagram", "안녕", "good"],
    urls: [
      { idx: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIP2L4JRAvDyJ-MiVSOGG0KqKy5wfva6u74w&usqp=CAU" },
      { idx: 2, url: "https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021050309472509343b45d942afb10624586229.jpg" },
    ],
  };

  return (
    <article className="flex flex-col border border-gray-200 rounded-sm font-sans">
      <header className="flex flex-row p-2">
        <div className="flex relative w-10 h-10 mr-2 justify-center items-center">
          <img className="absolute" src={imgProfileBorder} alt="profile border image" />
          <img className="absolute w-9 h-9 rounded-full" src={feed.profileUrl} alt="profile image" />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold">{feed.id}</div>
          <div className="text-xs">{feed.location}</div>
        </div>
        <div className="ml-auto my-auto text-xs cursor-pointer">편집</div>
      </header>

      <MSlider {...settings}>
        {feed.urls.map((it) => (
          <div>
            <img className="w-full h-96" src={it.url} alt="feed image" />
          </div>
        ))}
      </MSlider>

      <div className="flex flex-col h-32 p-2">
        <div className="flex-1 text-xs text-gray-400">{feed.date}</div>
        <p className="flex-2 line-clamp-3 text-sm text-black">{feed.content}</p>
        <div className="flex-1 truncate">
          {feed.hashtags.map((hastag) => (
            <span className="text-sm text-blue-500 cursor-pointer mr-1">#{hastag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default Feed;
