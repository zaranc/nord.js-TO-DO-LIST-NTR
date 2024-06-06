let express = require("express")
let routes = express.Router();
let todoroutes = require("./todo.route")


routes.use("/todo" , todoroutes)

module.exports = routes;