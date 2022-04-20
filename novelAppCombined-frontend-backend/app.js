require("dotenv").config();
require("./api/data/db");
const express = require("express");
const app = express();
const route = require("./api/routes/index");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});
app.use("/api", function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})
app.use("/api",route);

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.SERVER_START_MSG, server.address().port);
})
console.log("server starting ......");
