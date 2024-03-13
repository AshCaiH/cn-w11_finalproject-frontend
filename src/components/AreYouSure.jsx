import React, { useContext, useState } from "react";
import { userContext } from "../common/contexts";
import "./AreYouSure.css"
import { postRequest } from "../common/requests";

const AreYouSure = ({
  onConfirm,
  text,
  confirmText,
  title,
  confirmMessage,
  next,
  setNext
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);

  const {user} = useContext(userContext);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCancel = (e) => {
    if (e.type == "click" && !(e.target.classList.contains("modal") || e.target.classList.contains("cancel"))) return;

    setPassword("");
    setNext(null)
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setPassword("");
  };

  const checkPassword = async () => {
    const reqBody = JSON.stringify({
      username: user.username,
      password: password,
    });

    const response = await postRequest(`${import.meta.env.VITE_SERVER_URL}/users/logIn`, reqBody);

    if (response.error) setWrongPass(true);
    else {
      await next();
      setNext(null);
    }
  }



  return (
    <div className="modal" onClick={handleCancel}>
      <div className="element are-you-sure solid">
        <form onSubmit={(e) => {
            e.preventDefault()
            checkPassword()}
          }>
          <h2>{title ? title : "Confirmation"}</h2>
          <p>{confirmMessage}</p>
          <p>Please enter your password to confirm:</p>
          <input autoFocus type="password" value={password} onChange={handleChange} />

          <div>
            <button type="submit">{confirmText ? confirmText : "OK"}</button>
            <button className="cancel" onClick={handleCancel}>Cancel</button>
          </div>

          {wrongPass && <div>Incorrect password.</div>}
        </form>
      </div>
    </div>
  );
};

export default AreYouSure;
