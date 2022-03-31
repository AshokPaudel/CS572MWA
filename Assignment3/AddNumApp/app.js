const express = require('express');
require('dotenv').config();
const sumRoute = require('./routes/index');
const app = express();

app.use(function(req, res, next) {
    console.log(req.url, req.method);
    next();
})

app.use("*",sumRoute);

const server = app.listen(process.env.PORT, function (){
    console.log(process.env.MSG_SERVER_START, server.address().port);
});

console.log("starting");