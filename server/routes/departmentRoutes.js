const express = require("express");
const { createController, findController } = require("../Controller/departmentController");
const router = express.Router();

router.post("/createdepartment", createController);
router.get("/findDepartment", findController);

module.exports = router;
