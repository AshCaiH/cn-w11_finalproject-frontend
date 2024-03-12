import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages/page-home";
import PageUser from "./pages/page-user";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import Cookie from "js-cookie";
import { userContext } from "./common/contexts";
import { useState } from "react";
import LoginOrRegister from "./components/LoginOrRegister";

function App() {
  const [user, setUser] = useState();
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    if (document.cookie) {
      let token = Cookie.get("jwt_token");
      if (token === false) {
        setUser({});
      } else {
        logInWithToken(token, setUser);
      }
    }
  }, []);

  const logInWithToken = async (token, setUser) => {
    console.log("token", token);

    const authorizedUser = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/users/authCheck`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      return response.json();
    }).then(async (response) => {
      response.user.token = token;
      console.log(response.user);
      await setUser(response.user);
    });
  };
  return (
    // Allows us to reach "user" and "setUser" from any component.

    <userContext.Provider value={{ user, setUser, nightMode, setNightMode }}>
      <BrowserRouter basename="">
        <Navbar />
        <div id="content">
          {!user ? (
            <LoginOrRegister />
          ) : (
            <Routes>
              <Route path="" element={<PageHome />} />
              <Route path="/user" element={<PageUser />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
