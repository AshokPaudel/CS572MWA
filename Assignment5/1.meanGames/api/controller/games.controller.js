const mongoose = require("mongoose");
require("../data/games-model");
const Game = mongoose.model(process.env.GAME_MODEL);

getAllGames = function(req,res){
    const defCount=3;
    const maxCount=10;

    console.log(req.query, parseInt(req.query.count));
    if(req.query && parseInt(req.query.count)>=0 ){
        count = Math.min(10,req.query.count);
    }else{
        count=defCount;
    }
    console.log("at games controller : get all games ");
    console.log("count = ",count);
    if(count<=0){
        res.status(200).json({"message":"no data"});
        return;
    }
    Game.find().limit(count).exec(function(err, data){
        if(err){
            console.log("error fetching data from database");
            res.status(500).json({"message":"Something went Wrong"});
        }else{
            // console.log("game data", data);
            res.status(200).json(data);
        }
    })
};

const deleteGame = function(req, res){
    console.log("delete game request received");

}

const getOneGame = function(req,res){
    console.log("Get one game request receive");
    console.log(" request params :",req.params);
    if(req.params && req.params.gameId){
        const gameId = req.params.gameId;
        Game.findById(gameId).exec( function (err,data){
            if(err){
                res.status(500).json({"data":"Doesn't exist"});
                return;
            }else{
                console.log(data);
                res.status(200).json({"response":data});
                return;
            }
        });
    }
    // let game = Game.findById()
}

module.exports= {
    getAllGames,
    deleteGame,
    getOneGame
}