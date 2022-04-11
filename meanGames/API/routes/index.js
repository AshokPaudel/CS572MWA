const express = require('express');
// const res = require('express/lib/response');
const router = express.Router();
const gamesController = require("../controllers/games.controller");
const publisherController = require("../controllers/publisherController");

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne)
    .put(gamesController.replaceOne)
    .patch(gamesController.partialUpdateOne);

router.route("/game/:gameId/publisher")
    .get(publisherController.getOne);
        
module.exports=router;    