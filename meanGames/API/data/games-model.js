const mongoose = require("mongoose");
const PublisherSchema = mongoose.Schema({
    name: {
        type:String,
        require : true
    },
    country: String,
    established: Number,
    location:{
        type:[Number], //longiude((+)E/W(-)),latitide((-)N/S(+))
                        //
        index:"2dsphere"
    }

})
const GameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: Number,
    rate: {
        type:Number,
        min:1,
        max:5,
        default:1
    },
    price: Number,
    minPlayers: {
        type:Number,
        min:1,
        max:10
    },
    maxPlayers: {
        type:Number,
        min:1,
        max:10
    },
    minAge: Number,
    publisher:PublisherSchema,
    designers: [ String ]
});

mongoose.model(process.env.GAME_MODEL, GameSchema, process.env.GAME_COLLECTION);
