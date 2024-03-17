import React from "react";
import "./ExpSec.css";

const ExpSec = ({ imageUrl, title, age, location, description }) => {
  return (
    <div className="expsec">
      <img src={imageUrl} alt="" />
      <div className="exp-dets">
        <p>
          {title} - {age}
        </p>
        <p>
          {age} | {location}
        </p>
        <br />
        <br />
        <p>{description}</p>
      </div>
      <button className="swap-btn">SWAP</button>
      <button className="contact-btn">Contact</button>
    </div>
  );
};

export default ExpSec;
