const express = require("express");
const {
  createEmployee,
  loginEmployee,
  findEmpForTask,
  findEmpByIdController,
  getEmployee,
} = require("../Controller/empController");
const multer = require("multer");

const routes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

routes.post("/createEmployee", upload.single("file"), createEmployee);
// routes.post("/loginEmployee", loginEmployee);
routes.post("/findEmpForTask", findEmpForTask);
routes.get("/findEmpById/:id", findEmpByIdController);
routes.get("/getEmployee",getEmployee)

module.exports = routes;
