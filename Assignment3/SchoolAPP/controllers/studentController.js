const studentData  = require('../data/school.json');
module.exports.getAll = function(req, res){
    console.log('At student controller returning all data');
    res.status(200).json(studentData);

}

module.exports.getOne = function(req, res){
    console.log("return specific student");
    const retStudent = -1+ parseInt(req.params.studentIndex);//change to 1 indexed
    console.log(retStudent);
    if(retStudent<0 || retStudent>=studentData.length){
        res.status(404).send({"message": "Data not available"});
    }else if (retStudent<studentData.length){
        res.status(200).send(studentData[retStudent]);
    }else{
        res.status(404).send({"message": "Invalid Request"});
    }
}