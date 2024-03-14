import { useContext, useState } from "react";
import UserInfo from "./UserInfo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { userContext } from "../common/contexts";
import NightModeToggle from "./NightModeToggle";
import { GiHamburgerMenu } from "react-icons/gi";
import LogoutButton from "./LogoutButton";

export const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(userContext).user;

  return (
    <nav className="navbar">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="navbar-toggle show-mobile"
      >
        <GiHamburgerMenu />
      </button>

      <div className={`navbar-menu ${!isOpen && "hide-mobile"}`}>
        {user && (
          <>
            <img className="navbar-logo" src="public/weathercode.png" />
            <div className="navbar-links">
              <NavLink to="/">
                <button className="user-info-button">Dashboard</button>
              </NavLink>
              <NavLink to="/user">
                <button className="user-info-button">Profile</button>
              </NavLink>
              <NavLink to="/settings">
                <button className="user-info-button">Settings</button>
              </NavLink>
              <LogoutButton class="show-mobile" />
            </div>
            <UserInfo class="hide-mobile" />
          </>
        )}
        <NightModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
