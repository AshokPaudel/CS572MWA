const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
require("./novel-module");

mongoose.connection.on("connected", function(){
    console.log("mongoose connected to  ",process.env.DB_NAME);
});

mongoose.connection.on("error", ()=>console.log("Error connecting to mongoose"));