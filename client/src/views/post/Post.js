import icFileUpload from "../../assets/ic_file_upload.png";
import icCancelGray from "../../assets/ic_cancel_gray.png";
import { useState } from "react";

// const localImgs = [
//   {
//     file: null,
//     url: "https://img.etoday.co.kr/pto_db/2020/07/600/20200719224427_1486417_640_437.jpg",
//   },

//   "https://img.etoday.co.kr/pto_db/2020/07/600/20200719224427_1486417_640_437.jpg",
//   "https://img.etoday.co.kr/pto_db/2020/07/600/20200719224427_1486417_640_437.jpg",
//   "https://img.etoday.co.kr/pto_db/2020/07/600/20200719224427_1486417_640_437.jpg",
//   "https://img.etoday.co.kr/pto_db/2020/07/600/20200719224427_1486417_640_437.jpg",
// ];

function Post() {
  const [localImgs, setLocalImgs] = useState([]);

  const handleImgFile = (file) => {
    if (file === null) return;

    let reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setLocalImgs((locals) => [...locals, { file, url: reader.result }]);
      }
    };

    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    if (localImgs.length >= 5) {
      alert("파일은 최대 5개까지 공유할 수 있습니다.");
      return;
    }

    if (e.target.files && e.target.files[0]) {
      const _file = e.target.files[0];

      handleImgFile(_file);
    }
  };

  const onFileRemove = (idx) => {
    setLocalImgs((locals) => locals.filter((local, index) => index != idx));
  };

  return (
    <div className="border border-gray-200 rounded-sm">
      <header className="flex p-2 border-b-2">
        <div className="flex-1"></div>
        <div className="text-xl font-semibold flex-1 text-center">새 게시물 만들기</div>
        <div className="text-sm font-medium text-blue-500 flex-1 flex justify-end items-center cursor-pointer">공유하기</div>
      </header>

      <div className="grid grid-cols-3 h-96">
        <div className="flex flex-col col-span-2 border-r-2 p-1">
          <div className="flex-1">
            {localImgs.length == 0 && (
              <div className="h-full flex justify-center items-center">
                <img className="w-36" src={icFileUpload} />
                <div></div>
              </div>
            )}

            {localImgs.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {localImgs.map((localImg, index) => (
                  <div key={index} className="flex relative justify-center items border">
                    <img className="relative object-contain h-40 w-40" src={localImg.url} />
                    <img className="absolute top-1 right-1 w-3 h-3" src={icCancelGray} onClick={() => onFileRemove(index)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <label
            className="ml-auto inline-flex rounded-md text-white text-sm font-bold bg-blue-500 p-1.5 cursor-pointer"
            htmlFor="feed-img"
          >
            컴퓨터에서 선택
            <input id="feed-img" className="hidden" type="file" accept="image/jpg, image/png, image/jpeg" onChange={onFileChange}></input>
          </label>
        </div>

        <div className="col-span-1 p-1">2</div>
      </div>
    </div>
  );
}

export default Post;
