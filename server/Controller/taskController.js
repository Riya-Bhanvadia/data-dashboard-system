const { findTaskDB } = require("../DBService/taskDBServices");
const {
  createTaskService,
  updateTaskService,
  getTasks,
} = require("../Services/taskServices");

exports.createTask = async (req, res, next) => {
  const { task, empNameId, adminId, departmentId, date1 } = req.body;
  // console.log(req.body);
  // const adminId = "65258d4c0f3196525ed8f640";
  try {
    const result = await createTaskService({
      task,
      empNameId,
      adminId,
      departmentId,
      date1,
    });
    // console.log(result);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.findAllTasks = async (req, res, next) => {
  try {
    const result = await findTaskDB();
    res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.findTaskForEmp = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const result = await getTasks(id);

    let hasTask;

    if (result.length === 0) {
      hasTask = false;
    } else {
      hasTask = true;
    }
    const l = result.filter(i => i.completionStatus !== "Assigned")
  
    const obj = { hasTask, result, l};
    return res.json(obj);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.findIdAndUpdateStatus = async (req, res, next) => {
  const { id, approvedBy, empId, taskName } = req.body;
  try {
    const result = await updateTaskService({ id, approvedBy, empId, taskName });

    res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
