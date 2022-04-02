const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    name:String,
    studentId:String,
    courses:[{courseName: String,courseId: String}]
});
mongoose.model(process.env.STUDENT_MODEL,studentSchema,process.env.STUDENT_COLLECTION);