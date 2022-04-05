// const { log } = require("console");
const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);
const getAllStudents = function (req, res) {
    console.log("Inside getAllStudents ");
    const response = { status: 200, message: "" };
    const maxCount = 10;
    let count = maxCount;
    let offset = 0;
    if (req.params.count) {
        if (parseInt(req.params.count) < maxCount) {
            count = req.params.count;
        } else {
            response.status = 404;
            response.message = "count should be less than " + maxCount;
        }
    }
    if (response.status != 200) {
        return res.status(response.status).json(response.message);
    }
    offset = req.params.offset || offset;
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        if (err) {
            console.log("Error fetching data from DB ", err);
            response.status = 500;
            response.message = "Something went wrong";
        } else if (!students) {
            response.status = 204;
            response.message = "no data";
        } else {
            response.status = 200;
            response.message = students;
        }

        res.status(response.status).json(response.message);
    });

}
const addOneStudent = function (req, res) {
    const response = { status: 200, message: "" };
    //create json object for student 
    const newStudent = {
        name: req.body.name,
        studentId: req.body.studentId,
        courses: [req.body.courses]
    };
    Student.create(newStudent, function (err, insertedStudent) {
        if (err) {
            response.status = 500;
            response.message = "Something went wrong" + err;
            console.log("error adding data in database")
        } else {
            response.status = 201;
            response.message = "Student added successfully " + insertedStudent;
            console.log("Student added in database successfully ", insertedStudent);
        }
        res.status(response.status).json(response.message);
    });

}
const getOneStudent = function (req, res) {
    console.log("getOneStudent");
    const studentObjId = req.params.studentId;
    const response = { status: 200, message: "" };
    if (!mongoose.isValidObjectId(studentObjId)) {
        response.status = 404;
        response.message = "Invalid Id ";
        console.log("Provided studentObjId is invalid ", studentObjId);
        return res.status(response.status).json(response.message);

    } else {
        Student.findById(studentObjId).exec(function (err, student) {
            if (err) {
                response.status = 500;
                response.message = "Something went wrong"
            } else if (!student) {
                response.status = 400;
                response.message = "No data found for given Id";
                console.log("Data not found for student id ", studentObjId);
            } else {
                response.status = 200;
                response.message = student;
                console.log("Student fetched from db ", student);
            }
            return res.status(response.status).json(response.message);
        });
    }

}
const deleteOne = function (req, res) {
    console.log("deleteOne");
    const studentObjId = req.params.studentId;
    const response = { status: 200, message: "" };
    if (!mongoose.isValidObjectId(studentObjId)) {
        response.status = 404;
        response.message = "Invalid Id ";
        console.log("Provided studentObjId is invalid ", studentObjId);
        return res.status(response.status).json(response.message);

    } else {
        Student.findByIdAndDelete(studentObjId).exec(function (err, student) {
            if (err) {
                response.status = 500;
                response.message = "Something went wrong"
            } else if (!student) {
                response.status = 400;
                response.message = "No data found for given Id";
                console.log("Data not found for student id ", studentObjId);
            } else {
                response.status = 200;
                response.message = "Deleted successfully";
                console.log("Student deleted from db ", student);
            }
            return res.status(response.status).json(response.message);
        });
    }

};
const fullUpdateOne = function(req,res){
    console.log("full updateOne method called");
    const studentObjId = req.params.studentId;
    let response = { status: 200, message: "" };
    if (!mongoose.isValidObjectId(studentObjId)) {
        response.status = 404;
        response.message = "Invalid Id ";
        console.log("Provided studentObjId is invalid ", studentObjId);
        return res.status(response.status).json(response.message);
    } else {
        Student.findById(studentObjId).exec(function (err, student) {
            if (err) {
                response.status = 500;
                response.message = "Something went wrong"
            } else if (!student) {
                response.status = 400;
                response.message = "No data found for given Id";
                console.log("Data not found for student id ", studentObjId);
            } else {
                //do update job
                student.name = req.body.name;
                student.studentId = req.body.studentId;
                student.courses = req.body.courses;
                student.save( (err,savedStudent )=>{
                    if(err){
                        response.status=500;
                        response.message="Error saving student";
                        console.log("Error saving student ",err);
                    }else{
                        console.log("student saved to DB ", savedStudent);
                        response.status=200;
                        response.message="student saved successfully" + savedStudent;
                    }
                    return res.status(response.status).json(response.message);
                });
            }
          
        });
    }
}

module.exports = {
    getAllStudents,
    getOneStudent,
    addOneStudent,
    fullUpdateOne,
    // partialUpdateOne,
    deleteOne
}