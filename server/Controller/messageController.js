const { createMsg, getMsg } = require("../DBService/messageDBServices");
const {
  createOrUpdateMessageContent,
  updateMessageContent,
  updateMessageRead,
} = require("../Services/messageServices");

exports.createNewMessage = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await createMsg(req.body);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const result = await getMsg({ chatId: req.params.chatId });
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.createOrGetMessage = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const result = await createOrUpdateMessageContent(chatId);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.updateMessage = async (req, res, next) => {
  const { chatId, sender, message } = req.body;
  const createdAt = new Date();
  try {
    const result = await updateMessageContent(
      chatId,
      sender,
      message,
      createdAt
    );
    const obj = {
      message: req.body,
      createdAt: createdAt,
    };
    return res.json(obj);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.getReadStatus = async (req, res, next) => {
  const chatId = req.params;
  try {
    const result = await updateMessageRead(chatId);
    console.log(result);
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
