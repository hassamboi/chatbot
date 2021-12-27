if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bp = require("body-parser");
const jwt = require("jsonwebtoken");

// importing functions to handle response sending
const { get_response, get_matching_key, sanitize_string } = require("./handler/responseHandler");

// express app
const app = express();
const http = require("http").createServer(app);

// PORT to run the app on (default = 5000)
const PORT = process.env.PORT || 5000;

// get the Mongo URI connection string
const db = process.env.MONGO_URI;

// connecting to db
mongoose
  .connect(db)
  .then(result => http.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`)))
  .catch(err => console.log(err));

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000/",
  },
});

io.on("connection", socket => {
  console.log("user is connected");

  //welcome current user
  socket.emit("message", "Welcome to chat bot");
  //listen for chat
  socket.on("chatMessage", msg => {
    console.log(msg);
    const decoded = jwt.verify(msg.token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log(decoded);
    socket.emit("message", msg);
  });
  socket.on("disconnect", () => {
    socket.emit("message", "user has left");
  });
});

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
