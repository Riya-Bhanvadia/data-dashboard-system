const { findAndUpdate } = require("../DBService/empDBServices");
const {
  getMsg,
  createMsg,
  findOneAndUpdate,
  findMsg,
} = require("../DBService/messageDBServices");

exports.createOrUpdateMessageContent = async (chatId) => {
  try {
    const result = await getMsg({ chatId: chatId });

    if (result) {
      return result;
    }
    const msg = await createMsg({
      chatId: chatId,
      conversation: [],
    });
    return msg;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.updateMessageContent = async (chatId, sender, message, createdAt) => {
  try {
    const result = await findOneAndUpdate(
      { chatId: chatId },
      {
        $push: {
          conversation: {
            sender: sender,
            message: message,
            createdAt: createdAt,
          },
        },
      }
    );
    return result;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
};

exports.updateMessageRead = async () => {
  
  try {

    const data = await findMsg()
    // console.log(data.conversation);
    const r = data.conversation.filter((i) => i.read === false && i.sender === false)
    console.log(r);
    if(r.length === 0){
      return true
    }
    return false
    // const result = await findOneAndUpdate({
    //   chatId:chatId
    // },{$set:{read:true}})
      
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    throw error;
  }
}