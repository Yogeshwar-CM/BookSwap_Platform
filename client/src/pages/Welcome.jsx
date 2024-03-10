import React from "react";
import Login from "../components/Login";

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="wh1">
        Book Swapping <br />
        Platform
        <br />
        <span className="ins">Join the Community now!</span>
      </h1>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default Welcome;
