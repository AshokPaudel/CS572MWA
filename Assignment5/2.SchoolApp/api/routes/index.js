const express= require("express");
const routes = express.Router();
const studentController = require("../controller/student.controller");
const courseController = require("../controller/course.controller");
routes.route("/students")
    .get(studentController.getAllStudents);

routes.route("/students/:studentId")
    .get(studentController.getOneStudent);

routes.route("/students/:studentId/courses")
    .get(courseController.getAllCourses);

routes.route("/students/:studentId/courses/:courseId")
    .get(courseController.getOneCourse);
module.exports = routes;