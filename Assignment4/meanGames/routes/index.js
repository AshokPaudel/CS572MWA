const express = require("express");
const gameController = require("../controller/gameController");
const router = express.Router();

router.route("/games")
    .get(gameController.getGames)
    .post(gameController.addNewGame);
// .post(function(req, res){
//     console.log("req from router ",req.body);
// })

router.route("/games/:count")
    .get(gameController.getGames)


router.route("/games/delete/:id")
    .delete(gameController.delGame);
router.route("/findgame/:id")
    .get(gameController.findGame);
module.exports = router;