let http = require("http");
let express = require("express");
const connectdb = require("./db/connectdb");
const bodyParser = require("body-parser");
let cors = require("cors");
const routes = require("./routes");
let app = express();



//cors for using data base
app.use(cors({
    origin: "*"
}));

//for json body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes
app.use("/v1", routes)


//connectdatabse
connectdb();

//create server
http.createServer(app).listen(3003,(()=>{
    console.log("Server is running on port 3003");
}))