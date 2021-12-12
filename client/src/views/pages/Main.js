import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Content from "../../components/Content";
import { checkLogin } from "../../utils/storage";
import React, { useEffect } from "react";

export const SearchContext = React.createContext();

const searchStore = {
  filter: "all",
  value: "",
  getPosts: null,
};

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate("/");
    }
  }, []);

  return (
    <SearchContext.Provider value={searchStore}>
      <Header />

      <Content className="font-sans" />
    </SearchContext.Provider>
  );
}

export default Main;
