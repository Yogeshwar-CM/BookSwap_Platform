import React, { useState, useEffect } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ContactDetails from "../components/ContactDetails";
import Swap from "../components/Swap";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserContactInfo, setSelectedUserContactInfo] = useState(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    age: "",
    title: "",
    comment: "",
    contactNumber: "",
    location: "",
    address: "",
    imageUrl: "",
  });
  const [isSwapPopupOpen, setIsSwapPopupOpen] = useState(false);
  const currentUser = sessionStorage.getItem("userName");

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleContactClick = async (userId) => {
    setSelectedUserId(userId);
    try {
      const response = await axios.get(
        `https://bookswap-platform.onrender.com/books/${userId}`
      );
      setSelectedUserContactInfo(response.data._id);
    } catch (error) {
      console.error("Failed to fetch contact info: ", error);
    }
  };

  const handleCloseContactDetails = () => {
    setSelectedUserId(null);
    setSelectedUserContactInfo(null);
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "https://bookswap-platform.onrender.com/books"
      );
      const filteredBooks = response.data.filter(
        (book) => book.owner !== currentUser
      );
      setBooks(filteredBooks);
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

  const handleImageChange = (event) => {
    setNewBook({
      ...newBook,
      imageUrl: event.target.files[0],
    });
  };

  const handleAddBook = async (event) => {
    event.preventDefault();
    try {
      const owner = sessionStorage.getItem("userName");
      const formData = new FormData();
      formData.append("owner", owner);
      formData.append("age", newBook.age);
      formData.append("title", newBook.title);
      formData.append("comment", newBook.comment);
      formData.append("contactNumber", newBook.contactNumber);
      formData.append("location", newBook.location);
      formData.append("address", newBook.address);
      formData.append("image", newBook.imageUrl);

      await axios.post(
        "https://bookswap-platform.onrender.com/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchBooks();
      setIsAddingBook(false);
      setNewBook({
        age: "",
        title: "",
        comment: "",
        contactNumber: "",
        location: "",
        address: "",
        imageUrl: "",
      });
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Failed to add book: ", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const title = document.querySelector(
        ".search-fields[placeholder='Title']"
      ).value;
      const location = document.querySelector(
        ".search-fields[placeholder='Location']"
      ).value;
      const maxAge = document.querySelector(
        ".search-fields[placeholder='Max Age']"
      ).value;

      const response = await axios.get(
        "https://bookswap-platform.onrender.com/books"
      );
      const filteredBooks = response.data.filter((book) => {
        return (
          (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
          (!location ||
            book.location.toLowerCase().includes(location.toLowerCase())) &&
          (!maxAge || parseInt(book.age) <= parseInt(maxAge))
        );
      });
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Failed to search books: ", error);
    }
  };

  const handleSwapButtonClick = (bookId) => {
    setSelectedUserId(bookId);
    setIsSwapPopupOpen(true);
  };

  const handleCloseSwapPopup = () => {
    setIsSwapPopupOpen(false);
  };

  return (
    <div className="Home">
      {isSwapPopupOpen && (
        <Swap onClose={handleCloseSwapPopup} isOpen={isSwapPopupOpen} />
      )}
      <h2>Search what books you want</h2>
      <div className="bd1"></div>
      <div className="bd"></div>
      {selectedUserId && selectedUserContactInfo && (
        <ContactDetails
          info={selectedUserContactInfo}
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
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <button type="submit">Add Book</button>
              <button className="close-btn" onClick={toggleAddBook}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <form className="search-books" onSubmit={handleSearch}>
        <input type="text" className="search-fields" placeholder="Title" />
        <input type="text" className="search-fields" placeholder="Location" />
        <input type="number" className="search-fields" placeholder="Max Age" />
        <button type="submit" className="search-books-btn">
          Search
        </button>
      </form>
      <div className="exp">
        {books.map((book) => (
          <div className="expsec" key={book._id}>
            {book.imageUrl ? (
              <img
                src={`https://bookswap-platform.onrender.com/books/images/${book.imageUrl.replace(
                  "uploads/",
                  ""
                )}`}
                alt=""
              />
            ) : (
              <img src={tempIMG} alt="" />
            )}

            <p className="bt">
              {book.title} - {book.age}
            </p>
            <p className="bl">
              {book.age} | {book.location}
            </p>
            <br />
            <br />
            <p className="bc">{book.comment}</p>

            <button
              className="swap-btn"
              onClick={() => handleSwapButtonClick(book._id)}
            >
              SWAP
            </button>
            <button
              className="contact-btn"
              onClick={() => handleContactClick(book._id)}
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
