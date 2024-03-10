import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ToggleTheme from "./components/ToggleTheme";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
