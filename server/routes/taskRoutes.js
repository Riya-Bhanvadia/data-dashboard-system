const express = require("express");
const { createTask, findAllTasks, findIdAndUpdateStatus, findTaskForEmp } = require("../Controller/taskController");
// const { findTaskDB } = require("../DBService/taskDBServices");
const { requireSignin } = require("../middleware/authMiddleware");
const routes = express.Router();

routes.post("/createTask", createTask)
routes.get("/findTask", findAllTasks)
routes.post("/updateTask", findIdAndUpdateStatus)
routes.get("/findTaskForEmp/:id", findTaskForEmp)

module.exports = routes