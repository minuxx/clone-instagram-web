import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Content from "../../components/Content";
import { checkLogin } from "../../utils/storage";
import { useEffect } from "react";

function Main() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!checkLogin()) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div>
      <Header />

      <Content className="font-sans" />
    </div>
  );
}

export default Main;
