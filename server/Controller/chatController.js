const {
  createChatServices,
  findChatServices,
} = require("../Services/chatServices");

exports.createChatController = async (req, res, next) => {
  const { empId, adminId } = req.body;
  try {
    const result = await createChatServices(empId, adminId);
    res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getChats = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const result = await findChatServices(id);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
