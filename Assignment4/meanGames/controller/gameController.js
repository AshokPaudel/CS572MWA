const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;
//why it doesn't work when we do 
//const db = require("../data/dbconnection").get();
module.exports.getGames = function (req, res) {
    let offset = 0;
    let defaultCount = 3;
    let maxCount = 10;
    let count;
    console.log(req.params.count);
    if (req.params && req.params.count) {
        count = req.params.count <= maxCount ? parseInt(req.params.count) : maxCount;
    } else {
        count = defaultCount;
    }
    console.log("count = ", count);
    if (count < 0) {
        res.status(400).json({ "message": "provide valid input" });
        return;
    }
    const db = dbConnection.get();
    console.log("We are at gameController requesting for all games");
    // console.log("db connection",db);
    const gamesCollection = db.collection(process.env.DB_COLLECTION);
    gamesCollection.find().limit(count).toArray(function (err, gamesData) {
        if (err) {
            console.log("error getting data")
            res.status(400).json({ "message": err });
        } else {
            console.log(`found games `, gamesData);
            res.status(200).json(gamesData);
        }
    });
    // res.status(200).json({ "message": "Alldata" });
}

module.exports.addNewGame = function (req, res) {
    console.log("add new game request received");
    console.log(req.body);
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minPlayers >= 1 &&  req.   body.minPlayers <= 11 && req.body.minAge && req.body.minAge >= 6 && req.body.minAge <= 99) {

        let newGame = {
            "title":req.body.title,
            "price":req.body.price,
            "minPlayers":req.body.minPlayers,
            "minAge":req.body.minAge

        };

        const db = dbConnection.get();
        const gamesCollection = db.collection(process.env.DB_COLLECTION);
        gamesCollection.insertOne(newGame, function(err, response){
            if(err){
                res.status(500).json({"error":err});
            }else{
                res.status(201).json(response);
            }
        })
    }else{
        res.status(400).json({ "message": "Please provide valid data" });
        return;
    }
    // res.status(200).json({ "Game added": req.body });
}

module.exports.delGame = function(req,res){
    console.log("delete request receive")
    console.log(req.params);
    const gameId = req.params.id;

    const db = dbConnection.get();
    const gamesCollection = db.collection(process.env.DB_COLLECTION);
    gamesCollection.deleteOne({_id: gameId}, function(err, response){
        console.log("delete one request received");
        if(err){
            console.log("error deleting game");
            res.status(500).json({"error":err});
        }else{
            console.log("data deleted");
            res.status(200).json({"response":response});
        }
    });
}

module.exports.findGame = function(req,res){
    console.log("find one game");
    if(req.params && req.params.id){
        const gameId = req.params.id;
        const db = dbConnection.get();
        const gamesCollection = db.collection(process.env.DB_COLLECTION);

        gamesCollection.findOne({_id: ObjectId(gameId)}, function(err, data){
            if(err){
                console.log("error finding game");
                res.status(500).json({"error":err});
            }else{
                console.log("data fetceed");
                res.status(200).json({"response":data});
            }
        });

    }else{
        res.status(400).json({"message " : " please provide gameId"});
    }
}