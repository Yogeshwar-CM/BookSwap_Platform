import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const toggleDarkMode = () => {
    const rootElement = document.documentElement;
    rootElement.classList.toggle("Dark");
    rootElement.classList.toggle("Light");

    // Save the user's preference
    const currentMode = rootElement.classList.contains("Dark")
      ? "Dark"
      : "Light";
    localStorage.setItem("themeMode", currentMode);
  };

  // Check user preference and set the mode on page load
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      const rootElement = document.documentElement;
      rootElement.classList.add(savedMode);
    }
  }, []);

  return (
    <>
      <button onClick={toggleDarkMode}>THEME</button>
    </>
  );
}

export default App;
