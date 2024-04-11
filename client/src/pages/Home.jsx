import React, { useState, useEffect } from "react";
import "./Home.css";
import tempIMG from "../assets/b1.png";
import axios from "axios";
import ContactDetails from "../components/ContactDetails";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    owner: "",
    age: "",
    title: "",
    comment: "",
    contactNumber: "",
    location: "",
    address: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleContactClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleCloseContactDetails = () => {
    setSelectedUserId(null);
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books: ", error);
    }
  };

  const toggleAddBook = () => {
    setIsAddingBook(!isAddingBook);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleAddBook = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", newBook);
      fetchBooks();
      setIsAddingBook(false);
      setNewBook({
        owner: "",
        age: "",
        title: "",
        comment: "",
        contactNumber: "",
        location: "",
        address: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Failed to add book: ", error);
    }
  };

  return (
    <div className="Home">
      <h2>Search what books you want</h2>
      <div className="bd1"></div>
      <div className="bd"></div>
      {selectedUserId && (
        <ContactDetails
          userId={selectedUserId}
          onClose={handleCloseContactDetails}
        />
      )}
      <button className="add-book-btn" onClick={toggleAddBook}>
        Add New Book
      </button>
      {isAddingBook && (
        <div className="overlay">
          <div className="add-book-form">
            <h3>Add New Book</h3>

            <form onSubmit={handleAddBook} className="add-b">
              <input
                type="text"
                placeholder="Owner"
                name="owner"
                value={newBook.owner}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={newBook.age}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Comment"
                name="comment"
                value={newBook.comment}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Contact Number"
                name="contactNumber"
                value={newBook.contactNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={newBook.location}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={newBook.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Image URL"
                name="imageUrl"
                value={newBook.imageUrl}
                onChange={handleInputChange}
              />
              <button type="submit">Add Book</button>
              <button className="close-btn" onClick={toggleAddBook}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <form className="search-books">
        <input type="text" className="search-fields" value="Sci-Fi" />
        <input type="text" className="search-fields" value="Chennai" />
        <input type="date" className="search-fields" />
        <input type="text" className="search-fields" value="4+ Reviews" />
      </form>
      <div className="exp">
        {books.map((book) => (
          <div className="expsec" key={book._id}>
            <img src={tempIMG} alt="" />
            <div className="exp-dets">
              <p>
                {book.title} - {book.age}
              </p>
              <p>
                {book.age} | {book.location}
              </p>
              <br />
              <br />
              <p>{book.comment}</p>
            </div>
            <button className="swap-btn">SWAP</button>
            <button
              className="contact-btn"
              onClick={() => handleContactClick(book.ownerId)}
            >
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
