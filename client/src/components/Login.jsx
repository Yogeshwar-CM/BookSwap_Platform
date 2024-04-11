import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";
import google_logo from "../assets/google.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    try {
      let userId = null;
      let userName = null;
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        userId = userCredential.user.uid;
        userName = userCredential.user.displayName;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        userId = userCredential.user.uid;
        userName = userCredential.user.displayName;
      }
      sessionStorage.setItem("userId", userId); // Store user ID in sessionStorage
      sessionStorage.setItem("userName", userName); // Store user name in sessionStorage
      navigate("/home");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const userId = userCredential.user.uid;
      const userName = userCredential.user.displayName;
      sessionStorage.setItem("userId", userId); // Store user ID in sessionStorage
      sessionStorage.setItem("userName", userName); // Store user name in sessionStorage
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleAuthAction}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="btn-row">
          <button type="submit" className="login-btn">
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="ggl-btn"
          >
            Sign in with <img src={google_logo} alt="Google logo" />
          </button>
        </div>
      </form>
      <br />
      <div className="register-text">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Register here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
