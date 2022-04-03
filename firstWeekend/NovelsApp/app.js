require("dotenv").config();
require("./api/data/db");
const express = require("express");
const app = express();
const novelRoute = require("./api/routes/index");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use("/api",novelRoute);

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.SERVER_START_MSG, server.address().port);
})
console.log("server starting ......");
