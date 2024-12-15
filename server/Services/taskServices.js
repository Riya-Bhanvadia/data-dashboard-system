const { updateRateCompleteStatus } = require("../DBService/empDBServices");
const {
  createTaskDB,
  updateCompleteStatus,
  findOneDBservice,
  findTaskDB,
} = require("../DBService/taskDBServices");

exports.createTaskService = async (taskDetails) => {
  const { task, empNameId, adminId, departmentId, date1 } = taskDetails;
  try {
    const result = await createTaskDB({
      taskName: task,
      empId: empNameId,
      adminId: adminId,
      deptId: departmentId,
      deadline: date1,
    });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.updateTaskService = async (data) => {
  try {
    let status;
    const taskId = await findOneDBservice({ _id: data.id });
    const deadline = taskId.deadline;
    const today = new Date(); //current
    const deadlineDate = new Date(deadline); //deadline
    if (today.getFullYear() === deadlineDate.getFullYear()) {
      if (today.getMonth() === deadlineDate.getMonth()) {
        if (today.getDate() === deadlineDate.getDate()) {
          status = "onTime";
        } else if (today.getDate() > deadlineDate.getDate()) {
          status = "delayed";
        } else {
          status = "before time";
        }
      } else if (today.getMonth() > deadlineDate.getMonth()) {
        status = "delayed";
      } else {
        status = "before time";
      }
    } else if (today.getFullYear() > deadlineDate.getFullYear()) {
      status = "delayed";
    } else {
      status = "before time";
    }

    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const date = mm + "/" + dd + "/" + yyyy;
    const result = await updateCompleteStatus(
      { _id: data.id },
      {
        status: true,
        completedDate: date,
        completionStatus: status,
        approvedBy: data.approvedBy,
      }
    );
    let statusRate;
    if (status === "onTime") {
      statusRate = 5;
    } else if (status === "before time") {
      statusRate = 8;
    } else if (status === "delayed") {
      statusRate = 2;
    }
    const empData = await updateRateCompleteStatus(
      { _id: data.empId },
      { tasks: { statusRate: statusRate, taskName: data.taskName } }
    );
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.getTasks = async (data) => {
  try {
    const result = await findTaskDB({ empId: data });
    
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
