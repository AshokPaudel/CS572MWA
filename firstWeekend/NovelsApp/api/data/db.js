const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
require("./novel-module");

mongoose.connection.on("connected", function(){
    console.log("mongoose connected to  ",process.env.DB_NAME);
});

mongoose.connection.on("error", function(){
    return console.log("Error connecting to mongoose");
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MSG);
        process.exit(0);

    });
});

process.on("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGINT_MSG2);
        // process.exit(0);

    });
})