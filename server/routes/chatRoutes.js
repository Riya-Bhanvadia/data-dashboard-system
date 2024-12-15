const express = require("express");
const {
  createChatController,
  getChats,
} = require("../Controller/chatController");
const router = express.Router();

router.post("/createChat", createChatController);
router.get("/getChats/:id", getChats);

module.exports = router;
