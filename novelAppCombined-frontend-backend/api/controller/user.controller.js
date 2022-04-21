const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendResponse = require("./novel.controller").sendResponse;

const addUser = function (req, res) {
    console.log("Add user received ", req.body);
    const response = {
        status: parseInt(process.env.DATA_CREATE_SUCCESS),
        message: {}
    };
    if (req.body && req.body.username, req.body.password) {
        bcrypt.genSalt(10)
            .then((salt) => _generateHash(salt, req, res, response))
            .catch((error) => _catchSaltGenError(error))
        // .finally(()=>sendResponse(res,response));
    } else {
        response.status = process.env.INVALID_FORM_INPUT_STATUS;
        response.message = process.env.INVALID_FORM_INPUT_MSG;
        sendResponse(res,response);
    }
}
const _generateHash = function (salt, req, res, response) {
    //use the generatedSalt to create Hash of the password
    console.log("Hash generated");
    bcrypt.hash(req.body.password, salt)
        .then((hashedPwd) => _saveUserToDB(hashedPwd, req, res, response))
        .catch((error) => _catchHashGenError(error, res, response));
}

const _catchSaltGenError = function (error) {
    console.log("Error generating salt ", error);
    response.status = process.env.INTERNAL_SERVER_ERROR;
    response.message = process.env.ERROR_GENERATING_SALT;
    sendResponse(res, response);

}
const _catchHashGenError = function (error, res, response) {
    console.log("Error generating Hash ", error);
    response.status = process.env.INTERNAL_SERVER_ERROR;
    response.message = process.env.ERROR_GENERATING_HASH;
    sendResponse(res, response);

}

const _saveUserToDB = function (hashedPwd, req, res, response) {
    const name = req.body.name;
    const username = req.body.username;
    const password = hashedPwd;
    const newUser = { name: name, username: username, password: password };
    User.create(newUser)
        .then((createdUser) => {
            console.log("user created");
            response.status = parseInt(process.env.DATA_CREATE_SUCCESS);
            response.message = createdUser.username;
        })
        .catch((error) => {
            console.log("error saving user to db");
            response.status = parseInt(process.env.INTERNAL_SERVER_ERROR);
            response.message = error;
        })
        .finally(() => sendResponse(res, response));
}
const login = function (req, res) {
    const response = {
        status: parseInt(process.env.OK),
        message: {}
    };
    console.log("Validating login");
    console.log(req.body);
    if (req.body.username && req.body.password) {
        //check if userExists in the database
        User.findOne({ "username": req.body.username })
            .then((foundUser) => _validatePassword(foundUser, req, res, response))
            .catch((error) => _dataReadError(error, res, response));
    } else {
        response.status = process.env.INVALID_FORM_INPUT_STATUS;
        response.message = process.env.INVALID_FORM_INPUT_MSG;
        sendResponse(res, response);
    }
}

const _validatePassword = function (foundUser, req, res, response) {
    if (!foundUser) {
        response.status = process.env.INVALID_USER_NAME_PASSWORD_STATUS;
        response.message = process.env.INVALID_USER_NAME_PASSWORD_MSG;

        sendResponse(res, response);
    }
    else {
        bcrypt.compare(req.body.password, foundUser.password)
            .then((isValidPwd) => _handlePwdValidResult(isValidPwd, req, res, response))
            .catch((err) => _handlePwdValidError(err, res, response))
            .finally(() => sendResponse(res, response));
    }
}
const _handlePwdValidResult = function (isValidPwd, req, res, response) {
    if (isValidPwd) {
        const token = jwt.sign(
            {username: req.body.username }, 
            process.env.JWT_PASSWORD_PKEY, 
            { expiresIn: process.env.AUTHENTICATION_TOKEN_VALIDITY }
            );
        response.message={success:true,token:token};    
        console.log("Password validation Succeed ", isValidPwd , "token ",token);
        // response.message = process.env.LOGIN_SUCCESS_MSG;
    } else {
        console.log("Password validation failed ", isValidPwd);
        response.status = parseInt(process.env.INVALID_USER_NAME_PASSWORD_STATUS);
        response.message = process.env.INVALID_USER_NAME_PASSWORD_MSG;
    }

}
const _handlePwdValidError = function (err, res, response) {
    console.log("Password validation process error ", err);
    response.status = parseInt(process.env.INTERNAL_SERVER_ERROR);
    response.message = process.env.INTERNAL;
}

const _dataReadError = function (error, res, response) {
    console.log("Data read error", error);
    response.status = parseInt(process.env.INTERNAL_SERVER_ERROR);
    response.message = process.env.INVALID_FORM_INPUT_MSG;
    sendResponse(res, response);
}

module.exports = {
    addUser,
    login
}