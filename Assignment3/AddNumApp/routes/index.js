const express = require('express');
const router = express.Router();
const addNumber = require('../controller/addNumber');

router.route("/sum/:firstNum")
        .get(addNumber.add);
// router.route("")
//     .get(addNumber.add);
module.exports =router;