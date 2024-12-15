const {
  createChat,
  findChat,
  findOneChat,
} = require("../DBService/chatDBServices");

exports.createChatServices = async (empId, adminId) => {
  console.log(adminId);
  try {
    const result = await findOneChat({
      members: { $all: [empId, adminId] },
    });
    if (result) {
      return result;
    }
    const chat = await createChat({ members: [empId, adminId] });
    return chat;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findChatServices = async (data) => {
  try {
    const result = await findChat({ members: { $in: [data] } });
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
