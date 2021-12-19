const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: { type: String },
    response: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  messages: [messageSchema],
  registerDate: { type: Date, default: Date.now },
});

const User = new mongoose.model("user", userSchema);
module.exports = User;
