const express = require('express');
const path = require('path');
// const fs = require('fs');
require('dotenv').config();
const app = express();
const gameRoutes = require("./routes/index");

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api",gameRoutes);
const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.MSG_SERVER_START, port);
})