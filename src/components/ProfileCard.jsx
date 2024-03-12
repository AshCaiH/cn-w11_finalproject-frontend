import React from "react";
import "./ProfileCard.css";
// import profile_icon from "../assets/**placeholder**";

const ProfileCard = () => {
  return (
    <div className="userCard">
      <div className="gradiant"></div>
      <div className="profileDown">
        {/* <img src={profile_icon} alt="" /> */}
        <div className="profileTitle">Tim James</div>
        <div className="profileDescription">
          Insert dummy user information here
        </div>

        <div className="profileButton">
          <a href="mailto:tim@james.com">Contact Me</a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
