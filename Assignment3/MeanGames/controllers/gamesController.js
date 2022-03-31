const gamesData = require('../data/games.json');

module.exports.showAll = function(req, res){
    console.log('showAll Games data');
    res.status(200).send(gamesData);
}