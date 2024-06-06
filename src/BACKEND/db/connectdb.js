let mongoose = require("mongoose");


let connectdb = () =>{
    let base_url = "mongodb://localhost:27017/to-do"
    mongoose
    .connect(base_url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database not connected", err));
}

module.exports = connectdb
