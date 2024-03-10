import React, { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import "./Theme.css";
import { IoMoon } from "react-icons/io5";

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const rootElement = document.documentElement;
    rootElement.classList.toggle("Dark");
    rootElement.classList.toggle("Light");

    // Save the user's preference
    const currentMode = rootElement.classList.contains("Dark")
      ? "Dark"
      : "Light";
    localStorage.setItem("themeMode", currentMode);

    // Update the state
    setIsDarkMode(!isDarkMode);
  };

  // Check user preference and set the mode on page load
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      const rootElement = document.documentElement;
      rootElement.classList.add(savedMode);
      setIsDarkMode(savedMode === "Dark");
    }
  }, []);

  return (
    <div>
      <button onClick={toggleDarkMode} className="theme-btn">
        {isDarkMode ? <FaSun /> : <IoMoon />}
      </button>
    </div>
  );
};

export default ToggleTheme;
