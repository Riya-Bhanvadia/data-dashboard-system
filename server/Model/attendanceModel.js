const mongoose = require("mongoose");
const schema = mongoose.Schema;

const attendenceSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "employee",
  },
  attend: [],
});

module.exports = mongoose.model("attendance", attendenceSchema);
