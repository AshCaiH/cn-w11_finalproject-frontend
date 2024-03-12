import { useContext, useEffect } from "react";
import "./UserInfo.css";
import { userContext } from "../common/contexts";
import Cookie from "js-cookie";

const UserInfo = () => {
  const { user, setUser } = useContext(userContext);

  const handleLogout = () => {
    Cookie.remove("jwt_token", { path: "/" });
    setUser(null);
  };

  useEffect(() => {}, [user]);

  if (user) {
    return (
      <div className="user-info-container">
        <div className="user-info-left">
          {/* {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />} */}
          <div>
            <p className="user-greeting">Welcome {user.username}!</p>
          </div>
        </div>
        <div className="user-info-right">
          <button className="user-info-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
};

export default UserInfo;
