const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comment: String,
  contactNumber: String,
  location: String,
  address: String,
  imageUrl: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;


