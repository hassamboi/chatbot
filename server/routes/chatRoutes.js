const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");

// chat routes
router.get("/", auth, chatController.chat_index);

module.exports = router;
