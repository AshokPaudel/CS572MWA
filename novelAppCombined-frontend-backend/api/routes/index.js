const express = require("express");
const routes = express.Router();
const novelRoute = require("./novel-route");
const userRoute = require("./user-route");


routes.use("/novels",novelRoute);
routes.use("/user",userRoute);

module.exports = routes;
