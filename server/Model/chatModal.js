const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatSchema = new schema({
    members: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);
