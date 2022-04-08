const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);
const getAllStudents = function(req, res){
    const limit=5;
    console.log("Get all students request received");
   Student.find().limit(limit).exec(function(err, data){
       console.log(data);
       res.status(200).json(data);
   })
};
const getOneStudent = function(req,res){
    console.log("One student requested");
    const id = req.params.studentId;
    console.log("studentId=", id);
    Student.findOne({_id: id}, function(err, data){
        // Student.findOne({_id: '6247c64c57ca1f91a9749235'}, function(err, data){
        console.log( "Student found ", data,err);
        res.status(200).json(data);
    });
}
module.exports = {
    getAllStudents,
    getOneStudent
}