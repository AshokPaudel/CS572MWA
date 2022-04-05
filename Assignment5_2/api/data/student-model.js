const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    courseName:String,
    courseId:{
        type:String,
        required:true
    }
});
const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required:true
    },
    courses:[courseSchema]
});
mongoose.model(process.env.STUDENT_MODEL,studentSchema,process.env.STUDENT_COLLECTION);