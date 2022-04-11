require('dotenv').config();
require("./API/data/db");
// require("./API/data/dbconnection").open();
const express = require('express');
const { contentType } = require('express/lib/response');
const path = require('path');
// const fs = require('fs');

const app = express();
const routes = require('./API/routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(function(req, res, next) {
    console.log( req.method , req.url );
    next();
});

app.use("/api", function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods','*');
    next();
});


app.use("/api",routes);
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.MSG_SERVER_START, port);
})