const Task = require("../Model/taskModel");
exports.createTaskDB = async (task) => {
  try {
    const result = await Task.create(task);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findTaskDB = async (query) => {
  try {
    const result = await Task.find(query)
      .populate("empId","empName")
      .populate("adminId", "adminName")
      .populate("deptId", "name");
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.updateCompleteStatus = async (query, data) => {

  try {
    const result = await Task.findByIdAndUpdate(query, { $set: data });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findOneDBservice = async (query) => {
  try {
    const result = await Task.findOne(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
