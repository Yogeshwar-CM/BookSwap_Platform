import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Swap.css";

const Swap = ({ onClose }) => {
  const currentUser = sessionStorage.getItem("userName");
  const [userBooks, setUserBooks] = useState([]);
  const [selectedPin, setSelectedPin] = useState("");

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books`);
      const filteredBooks = response.data.filter(
        (book) => book.owner === currentUser
      );
      setUserBooks(filteredBooks);
    } catch (error) {   
      console.error("Failed to fetch user's books: ", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      setUserBooks(userBooks.filter((book) => book._id !== bookId));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Failed to delete book: ", error);
    }
  };

  const handleSwap = async () => {
    if (!selectedPin) {
      alert("Please enter a PIN.");
      return;
    }

    try {
      // Fetch all books from the server
      const response = await axios.get("http://localhost:3000/books");
      const allBooks = response.data;

      // Find the book with the entered swapPin
      const bookToDelete = allBooks.find(
        (book) => book.swapPin === selectedPin
      );
      if (!bookToDelete) {
        alert("No book found with the entered PIN.");
        return;
      }

      // Delete the book using its _id
      await axios.delete(`http://localhost:3000/books/${bookToDelete._id}`);

      // Update the userBooks state to remove the deleted book
      setUserBooks(userBooks.filter((book) => book._id !== bookToDelete._id));

      setSelectedPin("");
      alert("Book swapped successfully!");
    } catch (error) {
      console.error("Failed to swap book: ", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {/* <h2>Swap Books</h2> */}
        <div className="book-list">
          {userBooks.map((book) => (
            <div className="book-item" key={book._id}>
              <h3>{book.title}</h3>
              <p>PIN: {book.swapPin}</p>
              <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="pin-entry">
          <input
            type="text"
            placeholder="Enter PIN"
            value={selectedPin}
            onChange={(e) => setSelectedPin(e.target.value)}
          />
          <button onClick={handleSwap}>Swap</button>
        </div>
      </div>
    </div>
  );
};

export default Swap;
