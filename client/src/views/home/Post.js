import imgProfileBorder from "../../assets/img_profile_border.png";
import imgDefaultProfile from "../../assets/img_default_profile.png";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function Post({ post, onSearchWriterOrHashtag }) {
  const { location, createdAt, content, user, imgUrls } = post;

  const formatContent = () => {
    const contents = content.split(/\s*(#\S+)\s*/g).filter((x) => x);

    const result = contents.map((content) =>
      content.charAt(0) == "#" ? (
        <span
          name="hashtag"
          className="text-sm text-blue-500 cursor-pointer"
          onClick={() => onSearchWriterOrHashtag("hashtag", content.substring(1))}
        >
          {content}
        </span>
      ) : (
        content
      ),
    );

    return result;
  };

  return (
    <article className="flex flex-col border border-gray-200 rounded-sm font-sans">
      <header className="flex flex-row p-2">
        <div className="flex relative w-10 h-10 mr-2 justify-center items-center">
          <img className="absolute" src={imgProfileBorder} alt="profile border image" />
          <img
            className="absolute w-9 h-9 rounded-full"
            src={user.profileImgUrl != null ? user.profileImgUrl : imgDefaultProfile}
            alt="profile image"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold cursor-pointer" onClick={() => onSearchWriterOrHashtag("writer", user.name)}>
            {user.name}
          </div>
          <div className="text-xs">{location}</div>
        </div>
        <div className="ml-auto my-auto text-xs cursor-pointer">편집</div>
      </header>

      <MSlider {...settings}>
        {imgUrls.map((it) => (
          <div>
            <img className="w-full h-96" src={it.url} alt="post image" />
          </div>
        ))}
      </MSlider>

      <div className="flex flex-col h-32 p-2">
        <div className="text-xs text-gray-400">{createdAt.substring(0, 10)}</div>
        <p className="flex-1 line-clamp-3 text-sm text-black">{formatContent()}</p>
      </div>
    </article>
  );
}

export default Post;

// const post = {
//   idx: 1,
//   location: "서울, 강남",
//   createdAt: "2021-12-11T09:27:25.000Z",
//   content:
//     "안녕하세요.ddd안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요dddddddd.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요ddddd.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.ddddddddd안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.",
//   user: {
//     id: "minuxx",
//     profileUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/200710_%ED%95%9C%EC%86%8C%ED%9D%AC.png",
//   },
//   imgUrls: [
//     { idx: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIP2L4JRAvDyJ-MiVSOGG0KqKy5wfva6u74w&usqp=CAU" },
//     { idx: 2, url: "https://cgeimage.commutil.kr/phpwas/restmb_allidxmake.php?idx=3&simg=2021050309472509343b45d942afb10624586229.jpg" },
//   ],
// };
