const { findOneAdmin, findAdmin } = require("../DBService/adminDBServices");
const {
  createAdminService,
  loginService,
  getAdmin,
  getAdminNameService,
} = require("../Services/adminServices");
const { emploginService } = require("../Services/empServices");

exports.createAdmin = async (req, res, next) => {
  const { name, email, password, deptId, document, task, adminId } = req.body;
  try {
    const result = await createAdminService(
      name,
      email,
      password,
      deptId,
      document,
      task,
      adminId
    );
    // console.log(result);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);
    // console.log(result.found);
    if (!result.found) {
      const result = await emploginService(email, password);
      const value = { result, isAdmin: false };
      return res.json(value);
    }
    const value = { result, isAdmin: true };
    // console.log(result);
    return res.json(value);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.verifyToken = (req, res, next) => {
  res.json("verified");
};

exports.getAdminData = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await getAdmin(email);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const result = await findAdmin();
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getAdminNames = async (req, res, next) => {
  const { data } = req.body;
  console.log(req.body);
  try {
    const result = await getAdminNameService(req.body);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
