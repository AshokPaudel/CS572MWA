const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const fullUpdateOne = function (req, res) {
    console.log(" Line 5: Full Update One course Controller , student.controller2.js ", req.body);
    _updateOne(req, res, _fullCourseUpdate);
}

const partialUpdateOne = function (req, res) {
    console.log("partial update one ", req.body);
    _updateOne(req, res, _partialCourseUpdate);
}
const _fullCourseUpdate = function (req, res, student) {
    const courseObjId = req.params.courseId;
    student.courses.id(courseObjId).courseId = req.body.courseId ;
    student.courses.id(courseObjId).courseName = req.body.courseName;
    student.save(function (err, updatedStudent) {
        const response = { status: 201, message: updatedStudent.courses.id(courseObjId) };
        if (err) {
            response.status = 500;
            response.message = "Something went wrong"
            console.log("error saving student ", err);
        }
        res.status(response.status).json(response.message);
    });
};

const _partialCourseUpdate = function (req, res, student) {
    const courseObjId = req.params.courseId;
    student.courses.id(courseObjId).courseId = req.body.courseId || student.courses.id(courseObjId).courseId;
    student.courses.id(courseObjId).courseName = req.body.courseName || student.courses.id(courseObjId).courseName;
    student.save(function (err, updatedStudent) {
        const response = { status: 201, message: updatedStudent.courses.id(courseObjId) };
        if (err) {
            response.status = 500;
            response.message = "Something went wrong"
            console.log("error saving student ", err);
        }
        res.status(response.status).json(response.message);
    });
};

const _updateOne = function (req, res, courseUpdateCallback) {
    console.log("Update One Course Controller");
    const studentObjId = req.params.studentId;
    const courseObjId = req.params.courseId;
    Student.findById(studentObjId).select("courses").exec(function (err, student) {
        console.log("found Course", student.courses.id(courseObjId), " for student ", student);
        const response = { status: 204, message: student.courses.id(courseObjId) };
        if (err) {
            console.log("Error Finding game");
            response.status = 500;
            response.message = err;
        } else if (!student) {
            console.log("Game with given ID not found");
            response.status = 404;
            response.message = { message: "Game ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }
        courseUpdateCallback(req, res, student);
    });
}




module.exports = {
    fullUpdateOne,
    partialUpdateOne
}