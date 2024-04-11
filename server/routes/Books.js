const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

router.use("/images", express.static("uploads"));

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getBook, (req, res) => {
  res.json(res.book);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { owner, age, title, comment, contactNumber, address, location } =
    req.body;
  const imageUrl = req.file ? req.file.path : null; // Get image path if uploaded
  const book = new Book({
    owner,
    age,
    title,
    comment,
    contactNumber,
    address,
    location,
    imageUrl,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getBook, async (req, res) => {
  const {
    owner,
    age,
    title,
    comment,
    contactNumber,
    address,
    location,
    imageUrl,
  } = req.body;
  if (owner != null) {
    res.book.owner = owner;
  }
  if (age != null) {
    res.book.age = age;
  }
  if (title != null) {
    res.book.title = title;
  }
  if (comment != null) {
    res.book.comment = comment;
  }
  if (contactNumber != null) {
    res.book.contactNumber = contactNumber;
  }
  if (address != null) {
    res.book.address = address;
  }
  if (location != null) {
    res.book.location = location;
  }
  if (imageUrl != null) {
    res.book.imageUrl = imageUrl;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getBook, async (req, res) => {
  try {
    // Delete the associated file from the uploads folder
    if (res.book.imageUrl) {
      const imagePath = path.join(__dirname, "..", res.book.imageUrl);
      fs.unlinkSync(imagePath); // Delete the file synchronously
    }

    // Delete the record from the database
    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cannot find book" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
