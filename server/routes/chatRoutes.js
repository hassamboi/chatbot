const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");

// chat routes
router.get("/", auth, chatController.chat_index);
router.post("/", chatController.chat_message_post);

module.exports = router;
