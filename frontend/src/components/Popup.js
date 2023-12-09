import React, { useState } from "react";
import "./Popup.css";

function PopupComponent() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="popup-wrapper">
      <button className="modal-button" onClick={togglePopup}>
        No Assignments Showing Up?
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>No Assignments Showing Up?</h2>
            <p>
              Make sure you have a google calendar with the keyword "Canvas" in
              it's name
            </p>
            <button className="close-button" onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupComponent;
