const Message = require("../Model/messageModel");

exports.createMsg = async (query) => {
  try {
    const result = await Message.create(query);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.getMsg = async (query) => {
  try {
    const result = await Message.findOne(query).populate("chatId");
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findMsg = async () => {
  try {
    const result = await Message.find().populate("chatId");
    console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.findOneAndUpdate = async (query, data) => {
  try {
    const result = await Message.findOneAndUpdate(query, data);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};
