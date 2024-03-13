import React from "react";
import "./ProfileCard.css";
// import profile_icon from "../assets/**placeholder**";

const ProfileCard = () => {
  return (
    <div className="userCard element">
      <div className="gradiant"></div>
      <div className="profileDown">
        <img
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8Mg%3D%3D"
          alt=""
        />
        <div className="profileTitle">Tim James</div>
        <div className="profileDescription">
          Insert dummy user information here
        </div>

        <div className="profileButton">
          <a href="mailto:email@example.com">Contact Me</a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
