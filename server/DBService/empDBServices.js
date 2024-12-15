const Employee = require("../Model/employeeModel");
exports.createEmployeeDBService = async (employee) => {
  try {
    // console.log(employee);
    const user = await Employee.create(employee);
    // console.log(user);
    return user;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findOneEmployee = async (emp) => {
  try {
    const result = await Employee.findOne(emp);
    // console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmployee = async (emp) => {
  // console.log("emp" + emp);
  try {
    const result = await Employee.find(emp);
    // console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmployeeById = async (emp) => {
  // console.log(emp);

  try {
    const result = await Employee.find(emp);
    // console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmployeeDataById = async (emp) => {
  // console.log(emp);

  try {
    const result = await Employee.findById(emp);
    // console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.updateRateCompleteStatus = async (query, data) => {
  // const date = new Date().toLocaleDateString();

  try {
    const result = await Employee.findByIdAndUpdate(query, { $push: data });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findAndUpdate = async (query, data) => {
  try {
    const result = await Employee.findOneAndUpdate(query, { $addToSet: data });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
