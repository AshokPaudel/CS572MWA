require("./student-module");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to the database : ", process.env.DB_NAME);
})

mongoose.connection.on("error", function(error){
    console.log("Error connecting mongoose :", error);
})
