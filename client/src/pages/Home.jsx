import React, { useState, useEffect } from "react";
import "./Home.css";
import ExpSec from "../components/ExpSec";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

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
        {books.map((book) => (
          <ExpSec
            key={book._id}
            imageUrl={book.imageUrl}
            title={book.title}
            age={book.age}
            location={book.location}
            description={book.comment}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
