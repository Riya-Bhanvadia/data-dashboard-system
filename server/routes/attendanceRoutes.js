const express = require("express");
const { getEmpAttend } = require("../Controller/attendanceController");
const router = express.Router();

router.get("/getAttendance/:id", getEmpAttend)

module.exports = router