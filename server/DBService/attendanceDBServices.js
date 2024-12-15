const Attendance = require("../Model/attendanceModel.js");

exports.addAttendanceDB = async (query) => {
  try {
    const result = await Attendance.create(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.getAttendanceDB = async (query) => {
  try {
    const result = await Attendance.findOne(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
