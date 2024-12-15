const Admin = require("../Model/adminModel")

exports.createAdminDBService = async (admin) =>{
    try {
        const result = await Admin.create(admin)
        return result
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 422
        }
        throw error
    }
}

exports.findAdmin = async (admin) =>{
    try {
        const result = await Admin.find(admin)
        // console.log(result);
        return result
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 422
        }
        throw error
    }
}

exports.findOneAdmin = async (admin) =>{
    // console.log(admin);
    try {
        const result = await Admin.findOne(admin).populate("department","name")
        // console.log(result);
        return result
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 422
        }
        throw error
    }
}

