const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAllCourses=function(req,res){
    console.log("Get all courses called");
    const sId= parseInt(req.params.studentId);
    Student.find({studentId:sId}).select("courses").exec(function(error, data){
        console.log("courses found ", data);
        res.status(200).json({"courses ":data});
    })
};

const getOneCourse = function(req,res){
    console.log("get One course request received");
    console.log(req.params);
    const stId= parseInt(req.params.studentId);
    const cId = req.params.courseId;

    // Student.findOne({studentId:stId},{courses:true}).exec(function (err, student){
    //     const course = student.courses.filter(function (x) {
    //             return x.courseId == cId;
    //         });
    //     console.log("Found one Course", course);
    //     res.status(200).json(course);
    // })

    Student.findOne({studentId:stId},{courses:true}).then(data => {
        const foundCourse = data.courses.filter(item => item.courseId === cId)
        if (!foundCourse) return res.status(404).json({"message":"Please provide valid course Id and course Id"});
        return res.status(200).json(foundCourse)
    }, error => {
        res.status(500).json({
            error: error
        })
    })

    // // Student.find({studentId:stId},{courses:true}).find({courseId:cId}).exec(function (error , data){
    //     console.log("error = ", error, "data = ", data);
    //     res.status(200).json(data.courses);
    // })
}

module.exports = {
    getAllCourses,
    getOneCourse
};