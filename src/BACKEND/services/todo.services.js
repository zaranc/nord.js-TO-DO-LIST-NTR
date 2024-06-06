const { todoSchema } = require("../models")




let addtodo = (body) => {
    return todoSchema.create(body)
}

let findname = (task) => {
    return todoSchema.findOne({ task });
}


let gettodo = () => {
    return todoSchema.find()
}

let deletetodo = (id) => {
    return todoSchema.findByIdAndDelete(id)
}

let updatetodo = (id,body) => {
    return todoSchema.findByIdAndUpdate(id,body)
}








module.exports = { addtodo, findname, gettodo, deletetodo, updatetodo }