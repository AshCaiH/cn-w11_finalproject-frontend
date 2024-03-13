import React, { useState } from "react";

const AreYouSure = ({
  onConfirm,
  text,
  confirmText,
  title,
  confirmMessage,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPassword("");
  };

  const handleConfirm = () => {
    onConfirm(password);
    setShowConfirm(false);
    setPassword("");
  };

  return (
    <div className="are-you-sure">
      <button onClick={() => setShowConfirm(true)}>{text}</button>
      {showConfirm && (
        <div>
          <h2>{title}</h2>
          <p>{confirmMessage}</p>
          <p>Please enter your password to confirm:</p>
          <input type="password" value={password} onChange={handleChange} />
          <button onClick={handleConfirm}>{confirmText}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AreYouSure;
