const { addAttendanceDB } = require("../DBService/attendanceDBServices");
const JWT = require("jsonwebtoken");
const {
  createEmployeeDBService,
  findOneEmployee,
  findEmployee,
  findEmployeeById,
  findAndUpdate,
  findEmployeeDataById,
} = require("../DBService/empDBServices");
// const {createTaskDB} = require("../DBService/taskDBServices")
const { comparePassword, hashPassword } = require("../helpers/authHelper");
const { adminActivityTrack } = require("../middleware/adminActivityMiddleware");

exports.createEmployeeService = async (
  uname,
  email,
  password,
  deptId,
  file,
  task,
  adminId
) => {
  try {
    const data = await findEmployee({ empEmail: email });

    if (data.length !== 0) {
      const error = new Error("Email Already exists");
      error.statusCode = 422;
      throw error;
    } else {
      const hashedPassword = await hashPassword(password);

      const obj = {
        empName: uname,
        empEmail: email,
        password: hashedPassword,
        department: deptId,
        document: file,
      };
      const user = await createEmployeeDBService(obj);
      // console.log(user);

      const attendance = await addAttendanceDB({
        userId: user._id,
        attend: [],
      });

      await adminActivityTrack(adminId, task);
      return user;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.emploginService = async (email, password) => {
  try {
    if (!email || !password) {
      const error = new Error("Please fill all details");
      error.statusCode = 404;
      throw error;
    }
    const result = await findOneEmployee({ empEmail: email });
    if (!result) {
      const error = new Error("Invalid Email..");
      error.statusCode = 404;
      throw error;
    }

    const match = await comparePassword(password, result.password);

    if (!match) {
      const error = new Error("Invalid Password");
      error.statusCode = 404;
      throw error;
    }
    const token = await JWT.sign({ _id: result._id }, "LOGINKEY", {
      expiresIn: "1d",
    });
    console.log(token);
    const date = new Date().toLocaleDateString();
    const attend = await findAndUpdate(
      { empEmail: result.empEmail },
      { attendance: date }
    );
    const value = { result, token };
    return value;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmpByDeptId = async (deptId) => {
  try {
    const result = await findEmployeeById({ department: deptId });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmpById = async (empId) => {
  try {
    const result = await findEmployeeDataById({ _id: empId });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findEmailAndUpdateData = async (data) => {
  const date = new Date().toLocaleDateString();
  try {
    const result = await findAndUpdate(
      { empEmail: data },
      { attendance: date }
    );
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
