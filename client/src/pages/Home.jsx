import React from "react";
import "./Home.css";
import ExpSec from "../components/ExpSec";
// import ToggleTheme from "../components/ToggleTheme";

const Home = () => {
  return (
    <div className="Home">
      <h2>Search what books you want</h2>
      <form className="search-books">
        <input type="text" className="search-fields" value="Sci-Fi" />
        <input type="text" className="search-fields" value="Chennai" />
        <input type="date" className="search-fields" />
        <input type="text" className="search-fields" value="4+ Reviews" />
      </form>
      <div className="exp">
        <ExpSec />
        <ExpSec />
        <ExpSec />
        <ExpSec />
      </div>
    </div>
  );
};

export default Home;
