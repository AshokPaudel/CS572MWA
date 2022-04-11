// const dbConnection = require("../data/dbconnection");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);
const ObjectId = require("mongodb").ObjectId;


_runGeoQuery = function (req, res, offset, count) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const distance = parseInt(req.query.distance) || 100000;
    console.log(lng, lat, distance);
    const point = { type: "Point", coordinates: { lng, lat } };
    const query = {
        "publisher.location.coordinates":
        {
            $near:
            {
                $geometry: point,
                $minDistance: 0,
                $maxDistance: distance
            }
        }
    };
    // Game.find(query).skip(offset).limit(count).exec(function (err,games){
    Game.find(query).exec(function (err, games) {
        if (err) {
            console.log("Geo Error");
            res.status(500).json(err);
        } else {
            console.log("Geo results ", games);
            res.status(200).json(games);
        }

    })


}

module.exports.getAll = function (req, res) {
    console.log("GETALL controller called");


    const response = {
        status: 200,
        message: {}
    };
    let offset = 0;
    let count = 5;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    console.log(`offset = ${offset} count = ${count}`);
    if (isNaN(offset) || isNaN(count)) {
        console.log("offset or number is not a number");
        res.status = 400;
        res.message = "offset and count must be digits";
    }
    if (count > maxCount) {
        console.log("count is greater than max");
        res.status = 400;
        res.message = "count must be less than ";
    }
    if (response.status != 200) {
        res.status(response.status).json(response.message);
    } else {

        if (req.query.lat && req.query.lng) {
            _runGeoQuery(req, res, offset, count);
            return;
        }

        Game.find().skip(offset).limit(count).exec(function (err, data) {
            console.log(data);
            response.status = 200;
            response.message = data;
            console.log("data = ", data);
            res.status(response.status).json(response.message);
        });

    }

}
module.exports.getOne = function (req, res) {
    console.log("GETONE controller called");
    const gameId = req.params.gameId;
    let gameIdIsValid = mongoose.isValidObjectId(gameId);
    console.log("valid ", gameIdIsValid);
    //check if valid id: and throw error if id is valid or not
    if (gameIdIsValid) {
        Game.findOne({ _id: gameId }).exec(function (err, data) {
            if (err) {
                console.log("error reading games from database");
                res.status(500).json(err);
                return;
            } else {
                if (data) {
                    console.log(data);
                    res.status(200).json(data);
                } else {
                    console.log("Game is null");
                    res.status(404).json({ "messsage": "Game with given ID not found" });
                }

            }

        })
    } else {
        console.log("not a valid id");
        res.status(400).json({ "message": "not a valid ID" });
    }
}

module.exports.addOne = function (req, res) {
    console.log("AddOne controller called");
    console.log(req.body);
    let newGame = {};
    if (req.body && req.body.title && req.body.price) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.year= parseInt(req.body.year);
        newGame.rate = parseInt(req.body.rate);
        newGame.minPlayers = parseInt(req.body.minPlayers);
        newGame.maxPlayers = parseInt(req.body.maxPlayers);
        newGame.minAge= parseInt(req.body.minAge);
        Game.create(newGame, function (err, savedGame) {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(201).json({ savedGame });
            }
        })
    } else {
        res.status(400).json({ message: "Games with title and prie must be provided" });
    }
    // const gameIndex = req.params.gameIndex;
    // res.status(200).json(req.body);
    // console.log(req, res);

}
module.exports.replaceOne = function (req, res) {
    console.log("Full udate one game controller");

    const response = { status: 200, message: {} };
    const gameId = req.params.gameId;
    let gameIdIsValid = mongoose.isValidObjectId(gameId);
    console.log("valid ", gameIdIsValid);
    //check if valid id: and throw error if id is valid or not
    if (gameIdIsValid) {
        Game.findOne({ _id: gameId }).exec(function (err, game) {
            if (err) {
                console.log("error reading games from database");
                res.status(500).json(err);
                return;
            } else {
                if (game) {
                    console.log("found game", game);
                    game.title = req.body.title;
                    game.year = req.body.year;
                    game.rate = req.body.rate;
                    game.price = req.body.rate;
                    game.minPlayer = req.body.minPlayer;
                    game.maxPlayer = req.body.maxPlayer;
                    game.minAge = req.body.minAge;
                    game.publisher = req.body.publisher;
                    game.designers = [req.body.designers];

                   

                    game.save(function (err, savedGame) {
                        if (err) {
                            console.log("error saving game");
                        } else {
                            res.status(200).json(game);
                        }
                    })

                } else {
                    console.log("Game is null");
                    res.status(404).json({ "messsage": "Game with given ID not found" });
                }

            }

        })
    } else {
        console.log("not a valid id");
        res.status(400).json({ "message": "not a valid ID" });
    }


}

module.exports.partialUpdateOne = function (req, res) {
    console.log("Full udate one game controller");

    const response = { status: 200, message: {} };
    const gameId = req.params.gameId;
    let gameIdIsValid = mongoose.isValidObjectId(gameId);
    console.log("valid ", gameIdIsValid);
    //check if valid id: and throw error if id is valid or not
    if (gameIdIsValid) {
        Game.findOne({ _id: gameId }).exec(function (err, game) {
            if (err) {
                console.log("error reading games from database");
                res.status(500).json(err);
                return;
            } else {
                if (game) {
                    console.log("found game", game);
                    game.title = req.body.title || game.title;
                    game.year = req.body.year || game.year;
                    game.rate = req.body.rate || game.rate;
                    game.price = req.body.rate || game.price;
                    game.minPlayer = req.body.minPlayer || minPlayer;
                    game.maxPlayer = req.body.maxPlayer || maxPlayer;
                    game.minAge = req.body.minAge || game.minAge;
                    game.publisher = req.body.publisher || game.publisher;
                    game.designers = [req.body.designers] || game.designers;

                    game.save(function (err, savedGame) {
                        if (err) {
                            console.log("error saving game");
                        } else {
                            res.status(200).json(game);
                        }
                    })

                } else {
                    console.log("Game is null");
                    res.status(404).json({ "messsage": "Game with given ID not found" });
                }

            }

        })
    } else {
        console.log("not a valid id");
        res.status(400).json({ "message": "not a valid ID" });
    }


}
module.exports.deleteOne = function (req, res) {
    console.log("delete one game request received");
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
        const response = { status: 204, message: "GAme Deleted" };
        if (err) {
            console.log("error deleting game ", err);
            response.status = 500;
            response.message = "error deleting game";
        } else if (!deletedGame) {
            console.log("GAme Id not found");
            response.status = 404;
            response.message = "GAme Id doesn't exist"
        };
        res.status(response.status).json(response.message);
    });
}
