import React from "react";
import "./ExpSec.css";
import b1 from "../assets/b1.png";
import profile from "../assets/profile.png";

const ExpSec = () => {
  return (
    <div className="expsec">
      <img src={b1} alt="" />
      <div className="exp-dets">
        <p>Stephen Hawking - Theory of Everything</p>
        <p>3 Years | Chennai</p>
        <br />
        <br />
        <p>Looking for any Fiction or Non Fiction books in good condition</p>
      </div>
      <button className="swap-btn">SWAP</button>
      <button className="contact-btn">Contact</button>
      <img src={profile} alt="" className="profile"/>
    </div>
  );
};

export default ExpSec;
