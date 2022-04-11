const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
	country: String
});
const novelSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
	numberOfPages: Number,
	authors: [authorSchema]
});

mongoose.model(process.env.DB_MODEL,novelSchema,process.env.DB_COLLECTION);