import { useContext, useEffect } from "react";
import "./UserInfo.css";
import { userContext } from "../common/contexts";
import LogoutButton from "./LogoutButton";

const UserInfo = () => {
  const { user } = useContext(userContext);

  useEffect(() => {}, [user]);

  if (user) {
    return (
      <div className="user-info-container hide-mobile">
        <div className="user-info-left">
          {/* {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />} */}
          <div>
            <p className="user-greeting">Welcome {user.username}!</p>
          </div>
        </div>
        <div className="user-info-right">
          <LogoutButton />
        </div>
      </div>
    );
  }
};

export default UserInfo;
