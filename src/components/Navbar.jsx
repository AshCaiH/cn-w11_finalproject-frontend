import { useContext, useState } from "react";
import UserInfo from "./UserInfo";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { userContext } from "../common/contexts";
import NightModeToggle from "./NightModeToggle";

export const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const user = useContext(userContext).user;

  return (
    <nav className="navbar">
      <button onClick={() => setIsOpen(!isOpen)} className="navbar-toggle">
        Toggle Navbar
      </button>

      {isOpen && (
        <>          
          <div className="navbar-menu">
            {user && <>
              <div className="navbar-links">
                <NavLink to="/"><button className="user-info-button">Dashboard</button></NavLink>
                <NavLink to="/user"><button className="user-info-button">Profile</button></NavLink>
              </div>
              <UserInfo />
              </>
            }
            < NightModeToggle />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
