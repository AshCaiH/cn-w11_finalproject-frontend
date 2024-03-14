import React from "react";
import "./ProfileCard.css";
import { useContext, useState } from "react";
import { userContext } from "../common/contexts";
// import profile_icon from "../assets/**placeholder**";

const ProfileCard = () => {
  const user = useContext(userContext).user;
  console.log(user);
  return (
    <div className="userCard element">
      <div className="gradiant"></div>
      <div className="profileDown">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8Mg%3D%3D"
          alt=""
        />
        <div className="profileTitle">{user.username}</div>
        <div className="profileDescription">
          <p>Email: {user.email}</p>
          <p>Town: {user.town}</p>
        </div>

        <div className="profileButton">
          <a href={`mailto:${user.email}`}>Contact Me</a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
