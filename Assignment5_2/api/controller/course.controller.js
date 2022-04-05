const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAllCourses = function (req, res) {
    const studentObjId = req.params.studentId;
    const response = { status: 201, message: "" };
    if (!mongoose.isValidObjectId(studentObjId)) {
        response.status = 404;
        response.message = "Invalid StudentId ";
        res.status(response.status).json(response.message);
    } else {
        Student.findById(studentObjId).select("courses").exec(function (error, student) {
            if (error) {
                response.status = 500;
                response.message = "Something went wrong"
                console.log("Unable to fetch data from database ", error);
            } else if (!student) {
                response.status = 404;
                response.message = "Record not found";
                console.log("course not found for student ", student);
            } else {
                response.status = 200;
                response.message = student.courses;
                console.log("course fetched ", student.courses);
            }
            res.status(response.status).json(response.message);
        })
    }
}

const getOneCourse = function (req, res) {
    const studentObjId = req.params.studentId;
    const courseObjId = req.params.courseId;
    const response = { status: 201, message: "" };
    if (!(mongoose.isValidObjectId(studentObjId) && mongoose.isValidObjectId(courseObjId))) {
        response.status = 404;
        response.message = "Invalid StudentId or courseId ";
        res.status(response.status).json(response.message);
    } else {
        Student.findById(studentObjId).select("courses").exec(function (err,student){
        //.courses.id(courseObjId).exec(function (err, course) {
            if (err) {
                response.status = 500;
                response.message = "Something went wrong ";
                console.log("error fetching data ", error);
            } else if (!student) {
                response.status = 404;
                response.message = "No data found ";
                console.log("No data found ");
            } else {
                if(student.courses.id(courseObjId)){
                    response.status = 200;
                    response.message = student.courses.id(courseObjId);
                    console.log("course found ", student.courses.id(courseObjId));
                }else{
                    response.status = 404;
                    response.message = "course not found ";
                    console.log("Course not found ");
                }
               
               
            }
            res.status(response.status).json(response.message);
        })


    }
}
const addOneCourse = function (req, res){
    console.log("Add one course called");
    const studentObjId = req.params.studentId;
    const response = { status: 201, message: "" };
    if (!mongoose.isValidObjectId(studentObjId)) {
        response.status = 404;
        response.message = "Invalid StudentId ";
        res.status(response.status).json(response.message);
    } else {
       
      Student.findById(studentObjId).select("courses").exec(function (err, student){
        if (err) {
            response.status = 500;
            response.message = "Something went wrong ";
            console.log("error fetching data ", error);
        } else if (!student) {
            response.status = 404;
            response.message = "No data found ";
            console.log("No data found ");
        }
        if(student){
            _addCourse(req,res,student);
        }else{
            res.status(response.status).json(response.message);
        }
      });
}

const _addCourse = function (req,res,student){
    const newCourse = {courseId:req.body.courseId,courseName:req.body.courseName};
    student.courses.push(newCourse);
    //save to db
    _saveStudent(res,student);
};
const _saveStudent = function(res,student){
    console.log("At save student");
    student.save(function(err, savedStudent){
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = savedStudent.authors;
        }
        res.status(response.status).json(response.message);
    })
}
}

module.exports = {
    getAllCourses,
    getOneCourse,
    addOneCourse

}