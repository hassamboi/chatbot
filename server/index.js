const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bp = require("body-parser");

// express app
const app = express();
const PORT = process.env.PORT || 5000;

const db = require("./config/keys").MongoURI;

// connecting to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result =>
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
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
