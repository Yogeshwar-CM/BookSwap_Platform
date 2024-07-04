import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Info from "./pages/Info";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/info" element={<Info />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
