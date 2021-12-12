import { useNavigate } from "react-router";
import Header from "../../components/Header";
import Content from "../../components/Content";
import { checkLogin, getJwt } from "../../utils/storage";
import React, { useEffect } from "react";
import { getProfileApi } from "../../apis/auth";

export const UserContext = React.createContext();
export const SearchContext = React.createContext();

const searchStore = {
  filter: "all",
  value: "",
  getPosts: null,
  setSearch: null,
};

const userStore = {
  name: "",
  profileImgUrl: null,
};

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate("/");
      return;
    }

    getProfile();
  }, []);

  const getProfile = async () => {
    const res = await getProfileApi();

    handleResponse(res);
  };

  const handleResponse = (res) => {
    console.log(res);
    switch (res.code) {
      case 200:
        userStore.name = res.result.user.name;
        userStore.profileImgUrl = res.result.user.profileImgUrl;
        break;
      default:
        console.log(res.message);
    }
  };

  return (
    <UserContext.Provider value={userStore}>
      <SearchContext.Provider value={searchStore}>
        <Header />

        <Content className="font-sans" />
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default Main;
