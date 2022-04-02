require("dotenv").config();
require("./api/data/db");
const express = require("express");
const path = require("path");
const app = express();
const gameRouter = require("./api/routes/index");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//logger
app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use("/api",gameRouter);

const server = app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log(process.env.SERVER_START_MSG, port);
});

console.log("server starting......");


