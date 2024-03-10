import React, { useState } from "react";
import "./Auth.css";
import google_logo from "../assets/google.png";

const Login = () => {
  return (
    <div className="login-container">
      <form>
        <div class="form-row">
          <label for="UserName">UserName</label>
          <input
            type="text"
            id="UserName"
            name="UserName"
            placeholder="Ahmet Yilmaz"
          />
        </div>
        <div class="form-row">
          <label for="password">Password</label>
          <input
            type="password"
            id="UserName"
            name="password"
            placeholder="Ahmet Yilmaz"
          />
        </div>
        <div className="btn-row">
          <button className="login-btn">LOGIN</button>
          <button className="ggl-btn">
            Sign in with
            <img src={google_logo} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
