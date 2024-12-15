const {
  findAdminActivity,
  createAdminActivity,
} = require("../DBService/adminActivityDBServices");
const {
  createAdminDBService,
  findAdmin,
  findOneAdmin,
} = require("../DBService/adminDBServices");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

const JWT = require("jsonwebtoken");
const { adminActivityTrack } = require("../middleware/adminActivityMiddleware");

exports.createAdminService = async (
  adminName,
  email,
  password,
  department,
  document,
  task,
  adminId
) => {
  try {
    const data = await findAdmin({ email: email });
    if (data.length !== 0) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
    const hashedPassword = await hashPassword(password);
    const createData = {
      adminName: adminName,
      email: email,
      password: hashedPassword,
      department: department,
      document: document,
    };
    const result = await createAdminDBService(createData);
    await adminActivityTrack(adminId, task);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.loginService = async (email, password) => {
  try {
    if (!email || !password) {
      const error = new Error("Please fill all details");
      error.statusCode = 404;
      throw error;
    }
    const result = await findOneAdmin({ email: email });

    if (!result) {
      return { found: false };
    }
    const match = await comparePassword(password, result.password);
    if (!match) {
      const error = new Error("Invalid Password");
      error.statusCode = 404;
      throw error;
    }
    //  create token
    const token = await JWT.sign({ _id: result._id }, "SECRETKEY", {
      expiresIn: "7d",
    });
    const isActivityAvailable = await findAdminActivity({
      adminId: result._id,
    });
    console.log(isActivityAvailable);

    const date1 = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    if (!isActivityAvailable) {
      const activity = [{ task: "logged in", time: time, date: date1 }];
      const createActivity = await createAdminActivity({
        adminId: result._id,
        activity: activity,
      });
      console.log(createActivity);
    } else {
      isActivityAvailable.activity.push({
        task: "logged in",
        time: time,
        date: date1,
      });
      await isActivityAvailable.save();
    }
    console.log(token);
    const value = { result, token, found: true };
    return value;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.getAdmin = async (data) => {
  try {
    const result = await findOneAdmin({ email: data });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.getAdminNameService = async (data) => {
  console.log(data);
  try {
    let a = [];
    for (let i = 0; i < data.length; i++) {
      const result = await findOneAdmin({ _id: data[i] });
      a.push(result);
    }
    console.log(a);
    return a;
  } catch (error) {}
};
