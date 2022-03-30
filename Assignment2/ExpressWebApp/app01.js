const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// app.set("port", process.env.PORT);
app.post("",function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end("{'message' : 'JSON MESSAGE'}");
})
app.use("", express.static(path.join(__dirname, 'public'))); //for all get


const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.LISTEN_TO_PORT_MSG, port);
});