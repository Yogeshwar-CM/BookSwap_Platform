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
  swapPin: {
    type: String,
    default: generateSwapPin,
  },
});


function generateSwapPin() {
  const pin = Math.floor(1000 + Math.random() * 9000).toString();
  return pin;
}

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
