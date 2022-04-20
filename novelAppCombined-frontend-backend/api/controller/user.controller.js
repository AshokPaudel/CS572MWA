const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");
const sendResponse = require("./novel.controller").sendResponse;

const addUser = function(req, res){
    console.log("Add user received ", req.body);
    const response = {
        status: parseInt(process.env.DATA_CREATE_SUCCESS),
        message: {}
    };
    if (req.body && req.body.username, req.body.password) {
        bcrypt.genSalt(10)
        .then((salt) => _generateHash(salt, req, res,response))
        .catch((error) => _catchSaltGenError(error))
        // .finally(()=>sendResponse(res,response));
    }else{
        response.status=process.env.INVALID_FORM_INPUT_STATUS;
        response.message=process.env.INVALID_FORM_INPUT_MSG;
    }
}
const _generateHash = function (salt, req, res,response) {
    //use the generatedSalt to create Hash of the password
    bcrypt.hash(req.body.password, salt)
        .then((hashedPwd) => _saveUserToDB(hashedPwd, req, res,response))
        .catch((error) =>  _catchHashGenError(error,res,response));
}

const _catchSaltGenError = function(error){
    console.log("Error generating salt ",error);
    response.status=process.env.INTERNAL_SERVER_ERROR;
    response.message=process.env.ERROR_GENERATING_SALT;
    sendResponse(res,response);
    
}
const _catchHashGenError = function(error,res,response){
    console.log("Error generating Hash ",error);
    response.status=process.env.INTERNAL_SERVER_ERROR;
    response.message=process.env.ERROR_GENERATING_HASH;
    sendResponse(res,response);
    
}

const _saveUserToDB = function (hashedPwd, req, res,response) {
    const name = req.body.name;
    const username = req.body.username;
    const password = hashedPwd;
    const newUser = { name: name, username: username, password: password };
    User.create(newUser)
    .then((createdUser)=>{
        console.log("user created");
        response.status=parseInt(process.env.DATA_CREATE_SUCCESS);
        response.message=createdUser.username;
     })
     .catch((error)=>{
         console.log("error saving user to db");
         response.status=parseInt(process.env.INTERNAL_SERVER_ERROR);
        response.message=error;
     })
     .finally(()=>sendResponse(res,response));
}

module.exports={
    addUser
}