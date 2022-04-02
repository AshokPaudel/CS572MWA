const express= require("express");
const routes = express.Router();
const studentController = require("../controller/student.controller");

routes.route("/students")
    .get(studentController.getAllStudents);

routes.route("/students/:studentId")
    .get(studentController.getOneStudent);


module.exports = routes;