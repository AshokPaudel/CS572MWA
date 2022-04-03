const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseName: String,
    courseId: String
});

const studentSchema = mongoose.Schema({
    name:String,
    studentId:Number,
    courses:[courseSchema]
});
mongoose.model(process.env.STUDENT_MODEL,studentSchema,process.env.STUDENT_COLLECTION);