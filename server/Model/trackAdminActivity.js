const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminActivityTrackSchema = new Schema({
    adminId:{
        type: Schema.Types.ObjectId,
        ref:"admin"
    },
    activity:[]
})

module.exports = mongoose.model("adminActivityTrack", adminActivityTrackSchema)