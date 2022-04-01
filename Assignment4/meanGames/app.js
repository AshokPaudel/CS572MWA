require("dotenv").config();
require("./data/dbconnection").open();
const path = require("path");
const express = require("express");
const app = express();
const gameRoute = require("./routes/index");
// const { urlencoded } = require("express");

//this is important  if not included jason body is not parsed
app.use(express.json());  

app.use(express.urlencoded({ extended:true}));


app.use(function(req,res,next){
    console.log(req.url, req.method);
    // console.log("request body at the begining",req.body);
    next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use("/api",gameRoute);

const server = app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log(process.env.LISTEN_TO_PORT_MSG, port);
})





console.log("server starting.....");