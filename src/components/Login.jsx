import React, { useContext, useState } from "react";
import { userContext } from "../common/contexts";
import { postRequest } from "../common/requests";
import Cookie from "js-cookie";
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";

// // imported icons
// import { FaUserShield } from "react-icons/fa";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";

// // imported assets
// import video from "../../LoginAssets/weatherVid.mp4";
// import logo from "../../LoginAssets/logo.png";
export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const setUser = useContext(userContext).setUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = JSON.stringify({
      username: username,
      password: pass,
    });

    props.setFeedback(null);

    postRequest(`${import.meta.env.VITE_SERVER_URL}/users/logIn`, reqBody).then(
      (response) => {
        if (response.error) {
          props.setFeedback(response.error);
          props.setFeedbackType("error");
        } else {
          props.setFeedback("Login successful."); // The page will probably update before this is visible but it's here just in case.
          props.setFeedbackType("success");
          setUser(response.user);
          Cookie.set(
            "jwt_token",
            response.user.token,
            { expires: 7 },
            { path: "/" }
          );
        }
      }
    );

    setTimeout(() => {
      props.setFeedback("The server may need time to start up after a period of inactivity. Please wait up to one minute.");
      props.setFeedbackType("error");
    }, 1000)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          id="username"
          name="username"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="*********"
          id="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
      {/* <button onClick={() => props.onFormSwitch("register")}>
        Don&apos;t have an account? Register here
      </button> */}
    </>
  );
};

export default Login;
