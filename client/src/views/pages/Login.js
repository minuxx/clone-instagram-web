import mockUpImg from "../../assets/img_login_mockup.png";
import logo from "../../assets/logo-instagram-text.png";
import facebookLogo from "../../assets/logo-facebook.png";
import icAppStore from "../../assets/ic-app-store.png";
import icGooglePlay from "../../assets/ic-google-play.png";
import useInputs from "../../hooks/useInputs";
import { Link } from "react-router-dom";
import { loginApi } from "../../apis/auth";
import { useNavigate } from "react-router";
import { setLoginStorage } from "../../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [form, onChange] = useInputs({
    id: "",
    password: "",

    idError: "",
    passwordError: "",
    isValidate: false,
  });

  const { id, password, idError, passwordError, isValidate } = form;
  const onSubmit = async () => {
    try {
      const response = await loginApi({ id, password });
      console.log(response);
      handleResponse(response);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResponse = (res) => {
    const code = res.code;
    switch (code) {
      case 200:
        setLoginStorage(true, res.result.jwt);
        navigate("/home");
        break;
      case 400:

      case 401:
        console.log(res.message);
        // setError((error) => ({ ...error, validationError: res.message }));
        break;
    }
  };

  return (
    <section className="container h-screen flex justify-center items-center bg-gray-50">
      <article className="flex w-2/4 justify-center">
        <img src={mockUpImg} alt="mockup" className="mr-4" />

        <div className="flex flex-col w-72">
          <div className="flex flex-col w-full border border-gray-300 bg-white items-center py-8 mb-4">
            <img src={logo} alt="logo" className="w-32 mb-7" />
            <form className="flex flex-col w-10/12 items-center mb-3">
              <input
                type="email"
                name="id"
                maxLength="75"
                value={id}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-1"
                placeholder="전화번호, 사용자 이름 또는 이메일"
              />

              <input
                type="password"
                name="password"
                maxLength="75"
                value={password}
                onChange={onChange}
                className="w-full form-input px-2 py-1.5 border-gray-300 rounded-sm bg-gray-50 text-xs focus:border-gray-700 focus:ring-0 mb-3"
                placeholder="비밀번호"
              />

              <button
                type="submit"
                onClick={onSubmit}
                className={`w-full ${
                  !isValidate && "bg-opacity-50"
                } bg-blue-500 rounded text-white text-xs font-bold p-1 cursor-default`}
              >
                로그인
              </button>
            </form>

            <div className="w-10/12 flex flex-row justify-center items-center mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="flex-shrink-0 mx-2 text-xs font-bold text-gray-300">
                또는
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="w-10/12 flex flex-row justify-center mb-6 cursor-pointer">
              <img
                src={facebookLogo}
                className="w-4 mr-2"
                alt="facebook logo"
              />
              <div className="text-xs text-blue-900 font-bold">
                Facebook으로 로그인
              </div>
            </div>

            <div className="w-10/12 flex justify-center text-xs text-blue-900 font-light cursor-pointer">
              비밀번호를 잊으셨나요?
            </div>
          </div>

          <div className="flex flex-row w-full border border-gray-300 bg-white justify-center py-4 text-xs mb-4">
            계정이 없으신가요?
            <Link
              className="text-xs text-blue-500 font-bold ml-1 cursor-pointer"
              to="/account"
            >
              가입하기
            </Link>
          </div>

          <div className="flex flex-row w-full justify-center text-xs font-light mb-4">
            앱을 다운로드하세요.
          </div>

          <div className="flex flex-row w-full justify-center">
            <img
              src={icAppStore}
              alt="appstore icon"
              className="w-1/3 cursor-pointer mr-1.5"
            />
            <img
              src={icGooglePlay}
              alt="google play icon"
              className="w-1/3 cursor-pointer"
            />
          </div>
        </div>
      </article>
    </section>
  );
}

export default Login;
