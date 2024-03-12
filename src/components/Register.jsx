import React, { useState } from "react";
import { postRequest } from "../common/requests";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [username, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = JSON.stringify({
        username:   username,
        email:      email,
        password:   password,
    });

    const response = await postRequest(`${import.meta.env.VITE_SERVER_URL}/users/signUp`, reqBody);

    if (response.error) {
      props.setFeedback(response.error)
      props.setFeedbackType("error");
    } else {
      props.setFeedback("Registration successful.")
      props.setFeedbackType("success");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="name">Username</label>
        <input 
          value={username} 
          name="username" 
          id="username" 
          placeholder="Username" 
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="*********"
          id="password"
          name="password"
        />
        <button type="submit">Register</button>
      </form>
      {/* <button onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here
      </button> */}
    </>
  );
};

export default Register;
