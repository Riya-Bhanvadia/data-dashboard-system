const Department = require("../Model/departmentModel");

exports.createDepartment = async (department) => {
  try {
    const result = await Department.create(department);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findDepartment = async () => {
  try {
    const result = await Department.find();
    
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
