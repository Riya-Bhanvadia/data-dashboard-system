const { findAdminActivity } = require("../DBService/adminActivityDBServices");

exports.adminActivityTrack = async (result, task) => {
  console.log(result);
  const date1 = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  try {
    const isActivityAvailable = await findAdminActivity({
      adminId: result,
    });
    console.log(isActivityAvailable);
    isActivityAvailable.activity.push({
      task: task,
      time: time,
      date: date1,
    });
    await isActivityAvailable.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
