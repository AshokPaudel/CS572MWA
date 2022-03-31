const express = require('express');
const routes = express.Router();
const gamesController = require('../controllers/gamesController');

routes.route("/games").get(gamesController.showAll);


module.exports =routes;