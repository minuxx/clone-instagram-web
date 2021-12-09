import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Content from "../../components/Content";
import { checkLogin } from "../../utils/storage";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />

      <Content />
    </div>
  );
}

export default Main;
