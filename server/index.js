const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const booksRouter = require("./routes/Books");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Middleware
const corsOptions = {
  origin: "https://swook.vercel.app",
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Routes
app.use("/books", booksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
