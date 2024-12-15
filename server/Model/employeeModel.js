const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema({
  empName: {
    type: String,
    required: true,
  },
  empEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: schema.Types.ObjectId,
    ref: "department",
    required: true,
    // type:String
  },
  document: {
    type: String,
  },
  loginStatus: {
    type: Boolean,
    default: false,
  },
  tasks: [],
  attendance: [],
  isAdmin: {
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model("employee", employeeSchema);
