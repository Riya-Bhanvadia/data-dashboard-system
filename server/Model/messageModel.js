const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    chatId: {
      type: schema.Types.ObjectId,
      ref: "chat",
    },
    conversation: [
      {
        sender: {
          type: Boolean,
        },
        message: {
          type: String,
        },
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: String,
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
