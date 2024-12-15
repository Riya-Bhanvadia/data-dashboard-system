const multer = require("multer");
const {
  createEmployeeService,
  emploginService,
  findEmpByDeptId,
  findEmailAndUpdateData,
  findEmpById,
} = require("../Services/empServices");
const { findEmployee } = require("../DBService/empDBServices");

exports.createEmployee = async (req, res, next) => {
  
  const uname = req.body.detailsUname;
  const email = req.body.detailsEmail;
  const password = req.body.detailsPwd;
  const file = req.body.doc;
  const deptId = req.body.deptId;
  const task = req.body.task;
  const adminId = req.body.adminId;

  try {
    const result = await createEmployeeService(
      uname,
      email,
      password,
      deptId,
      file,
      task,
      adminId
    );

    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

// exports.loginEmployee = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const result = await emploginService(email, password);
//     // console.log(result.found);
//     // const attend = await findEmailAndUpdateData(email);
//     // console.log(attend);
//     return res.json(result);
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 422;
//     }
//     return next(error);
//   }
// };

exports.findEmpForTask = async (req, res, next) => {
  const { deptId } = req.body;
  // console.log(req.body);
  try {
    const result = await findEmpByDeptId(deptId);
    // console.log("r"+ result);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.findEmpByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await findEmpById(id);
    res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const result = await findEmployee();
    return res.json(result);
  } catch (error) { 
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
