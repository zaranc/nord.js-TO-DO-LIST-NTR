let express = require("express");
const { todoController } = require("../controller");
let route = express.Router();

// post route
route.post("/addtask", todoController.addtodo)


// getroute
route.get("/gettask", todoController.gettodo)
route.get("/gettaskstatuscomplete", todoController.statuscomplete)
route.get("/gettaskstatusuncomplete", todoController.statusuncomplete)

// deleteroute
route.delete("/deletetask/:id", todoController.deletetodo)

// updateroute
route.put("/updatetask/:id" ,todoController.updatedata )

module.exports = route;