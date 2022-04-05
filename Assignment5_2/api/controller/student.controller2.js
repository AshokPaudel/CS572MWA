const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const fullUpdateOne = function (req, res) {
    console.log(" Line 5: Full Update One Student Controller , student.controller2.js");

    studentUpdate = function (req, res, student, response) {
        student.name = req.body.name;
        student.studentId = req.body.studentId;
        student.courses = req.body.courses;
        student.save(function (err, updatedStudent) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            console.log("line 16 : response message received from here ");
            res.status(response.status).json(response.message);
        })
    }
    _updateOne(req, res, studentUpdate);
}

const _updateOne = function (req, res, updatedStudentCallback) {
    console.log("Line 23: Update One Student Controller2");
    const studentObjId = req.params.studentId;
    Student.findById(studentObjId).exec(function (err, student) {
        const response = { status: 204, message: student };
        if (err) {
            response.status = 500;
            response.message = "Something went wrong"
        } else if (!student) {
            response.status = 400;
            response.message = "No data found for given Id";
            console.log("Line 33: Data not found for student id ", studentObjId);
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            updatedStudentCallback(req,res,student,response);
        }
    });
}

const partialUpdateOne = function(req, res){
    console.log("Partial update one, student.controller2.js");
    studentUpdate = function(req,res, student,response){
        student.name = req.body.name || student.name;
        student.studentId = req.body.studentId || student.studentId;
        student.courses = req.body.courses || student.courses;

        student.save(function(err, updatedStudent){
            if (err) {
                response.status = 500;
                response.message = err;
            }else{
                response.status=200;
                response.message=updatedStudent;
            }
            console.log("Line 59 : returned ", response.message);
            res.status(response.status).json(response.message);
        });
    }
    _updateOne(req,res,studentUpdate);
}


module.exports={
    fullUpdateOne,
    partialUpdateOne
}