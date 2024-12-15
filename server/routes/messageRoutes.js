const express = require("express");
const { createOrGetMessage, updateMessage, updateReadStatus, getReadStatus } = require("../Controller/messageController");
const router = express.Router();

router.get("/createOrGetMessage/:chatId", createOrGetMessage)
router.post("/updateMessage", updateMessage)
// router.post("/updateReadStatus", updateReadStatus)
router.get("/getReadStatus/:chatId", getReadStatus)

module.exports = router