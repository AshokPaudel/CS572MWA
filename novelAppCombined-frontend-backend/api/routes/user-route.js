const express= require("express");
const routes = express.Router();
const userController = require("../controller/user.controller");
const { route } = require("./novel-route");

routes.route("")
    .post(userController.addUser);
    
routes.route("/login")
    .post(userController.login);
module.exports=routes;