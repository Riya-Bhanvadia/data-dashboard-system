const bcrypt = require("bcrypt")

exports.hashPassword = async (password) =>{
    try {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 422
        }
        throw error
    }
}

exports.comparePassword = async (password, hashedPassword) =>{
return bcrypt.compare(password, hashedPassword)
}