if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bp = require("body-parser");
const synonyms = require("synonyms");

// express app
const app = express();
const http = require("http").createServer(app);

// PORT to run the app on (default = 5000)
const PORT = process.env.PORT || 5000;

// get the Mongo URI connection string
const db = process.env.MONGO_URI;

// connecting to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result =>
    http.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch(err => console.log(err));

// --- MIDDLEWARE ---
// logger middleware
app.use(morgan("dev"));

// body parser for url encoded data (form data)
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

// handle user routes
app.use("/users", require("./routes/userRoutes"));

// handle chat routes
app.use("/chat", require("./routes/chatRoutes"));

// TESTING API
console.log(synonyms("hello"));
