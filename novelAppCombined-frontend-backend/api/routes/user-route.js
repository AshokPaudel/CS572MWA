const express= require("express");
const routes = express.Router();
const userController = require("../controller/user.controller");

routes.route("")
    .post(userController.addUser)

module.exports=routes;