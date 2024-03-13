import { useContext } from "react";
import { userContext } from "../common/contexts";
import Cookie from "js-cookie";

export const LogoutButton = (props) => {
    const { setUser } = useContext(userContext);

    const handleLogout = () => {
        Cookie.remove("jwt_token", { path: "/" });
        setUser(null);
    };

    return (
        <button className={`user-info-button ${props.class}`} onClick={handleLogout}>
            Logout
        </button>
    )
}

export default LogoutButton;