const express = require('express');
const path = require('path');
// const fs = require('fs');
require('dotenv').config();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.MSG_SERVER_START, port);
})