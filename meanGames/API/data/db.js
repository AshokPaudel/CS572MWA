const mongoose = require("mongoose");
require("./games-model");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to ", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (error) {
    console.log("Mongoose Error ", error);
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