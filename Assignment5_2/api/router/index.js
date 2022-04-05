const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller");
const studentController2 = require("../controller/student.controller2");
const courseController = require("../controller/course.controller");
const courseController2 = require("../controller/course.controller2");

router.route("/students")
    .get(studentController.getAllStudents)
    .post(studentController.addOneStudent)
    

router.route("/students/:studentId")
    .get(studentController.getOneStudent)
    .delete(studentController.deleteOne)
    .put(studentController2.fullUpdateOne)
    .patch(studentController2.partialUpdateOne);   

router.route("/students/:studentId/courses")
    .get(courseController.getAllCourses)
    .post(courseController.addOneCourse)


router.route("/students/:studentId/courses/:courseId")
    .get(courseController.getOneCourse)
    .put(courseController2.fullUpdateOne)
    .patch(courseController2.partialUpdateOne)

module.exports = router;