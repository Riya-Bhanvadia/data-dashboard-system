const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema({
  adminName: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  department: {
    type: schema.Types.ObjectId,
    ref:"department",
    required: true,
    // type:String
  },
  document: {
    type: String,
    required: true,
  },
  isAdmin: {
    type:Boolean,
    default: true
  }
});

module.exports = mongoose.model("admin", adminSchema);
