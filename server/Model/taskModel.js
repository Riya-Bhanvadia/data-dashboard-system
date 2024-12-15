const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema(
  {
    taskName: {
      type: String,
      
    },
    empId: {
      type: schema.Types.ObjectId,
      ref: "employee",
      
    },
    adminId: {
      type: schema.Types.ObjectId,
      ref: "admin",
      
    },
    deptId: {
      type: schema.Types.ObjectId,
      ref: "department",
      
    },
    deadline: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    completedDate: {
      type: String,
    },
    completionStatus: {
      type: String,
      default: "Assigned",
    },
    approvedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
