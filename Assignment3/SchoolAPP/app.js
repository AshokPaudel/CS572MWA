const express = require('express');
require('dotenv').config();
const app = express();
const studentRouter = require('./routes/index');

app.use(function(req, res, next) {
    console.log(req.url, req.method);
    next();
})

app.use("/api",studentRouter);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.MSG_SERVER_START, port);
});
console.log("----server starting---------");