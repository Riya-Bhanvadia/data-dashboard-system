const Chat = require("../Model/chatModal.js")

exports.findOneChat = async (query) => {
    
    try {
        const result = await Chat.findOne(query)
        return result
    } catch (error) {
        console.log(error);
    }
}
exports.createChat = async (query) => {
    console.log(query);
    try {
        const result = await Chat.create(query)
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
    }
}
exports.findChat = async (query) => {
    
    try {
        const result = await Chat.find(query)
        return result
    } catch (error) {
        console.log(error);
    }
}

