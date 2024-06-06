let { todoServices } = require("../services")



let addtodo = async (req, res) => {


    try {
        let body = req.body
        console.log("🚀 ~ addtodo ~ body:", body)
        let task = body.task
        console.log("🚀 ~ addtodo ~ task:", task)

        let duplicate = await todoServices.findname(task);

        if (duplicate) {

            throw new Error(`${duplicate.task}"this task is already exist"`)

        }

        let result = await todoServices.addtodo(body);


        if (!result) {
            throw new Error("some thing went wrong")
        }

        res.status(201).json({
            message: "add todo data succesfully",
            result,
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }

}


let gettodo = async (req, res) => {

    try {
        let result = await todoServices.gettodo();


        if (!result) {
            throw new Error("something went wrong");
        }
        else {
            res.status(200).json({
                message: "get todo data succesfully",
                result
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

let statuscomplete = async (req, res) => {
    try {
        let result = await todoServices.gettodo();
        let status = result.filter((val) => val.status == true)
        console.log("🚀 ~ statuscomplete ~ status:", status)
        res.status(200).json({
            message: "get complte task",
            result: status,
        })

    } catch (error) {

    }
}

let statusuncomplete = async (req, res) => {
    try {
        let result = await todoServices.gettodo();
        let status = result.filter((val) => val.status == false)
        console.log("🚀 ~ statuscomplete ~ status:", status)
        res.status(200).json({
            message: "get not completed task",
            result: status,
        })

    } catch (error) {

    }
}

let deletetodo = async (req, res) => {
    try {
        let { id } = req.params

        let result = await todoServices.deletetodo(id);

        res.status(201).json({
            message: "delete todo data succesfully",
            result
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
}


let updatedata = async (req, res) => {
    try {
        let { id } = req.params
        let body = req.body

        let result = await todoServices.updatetodo(id, body)
        res.status(201).json({
            message: "update data succefully",
            result,
            body
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}





module.exports = { addtodo, gettodo, deletetodo, updatedata, statuscomplete, statusuncomplete }