
let mongoose = require("mongoose")

let todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: Boolean,
        default:false,
    }
})

let todo = mongoose.model("todoSchema" , todoSchema)
module.exports = todo;