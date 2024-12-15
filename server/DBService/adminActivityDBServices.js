const AdminActivity = require("../Model/trackAdminActivity");

exports.createAdminActivity = async (query) => {
  try {
    const result = await AdminActivity.create(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findAdminActivity = async (query) => {
  try {
    const result = await AdminActivity.findOne(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
