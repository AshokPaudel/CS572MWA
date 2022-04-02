const mongoose = require("mongoose");
const gameSchema = mongoose.Schema({
        title: {
            type:String,
            require: true
        },
        year: Number,
        rate: Number,
        price: Number,
        minPlayers: Number,
        maxPlayers: Number,
        publisher: {
          name:String,
          country: String,
          established: Number
        },
        reviews: [ ],
        minAge: Number,
        designers: [ String ]
});
mongoose.model(process.env.GAME_MODEL,gameSchema,process.env.GAME_COLLECTION);