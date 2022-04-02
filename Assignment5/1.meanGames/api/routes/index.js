const express= require("express");
const router = express.Router();
const gameController = require("../controller/games.controller");

router.route("/games")
    .get(gameController.getAllGames);

router.route("/games/:gameId")
    .get(gameController.getOneGame);
module.exports = router;