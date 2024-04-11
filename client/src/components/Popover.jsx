import React, { useState } from "react";
import "./Popover.css";

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popover-container">
      <button className="toggle-button" onClick={togglePopover}>
        Open Popover
      </button>
      {isOpen && (
        <div className="popover">
          <h3>Popover Content</h3>
          <p>This is the content of the popover.</p>
        </div>
      )}
    </div>
  );
};

export default Popover;
