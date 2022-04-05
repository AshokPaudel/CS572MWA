const mongoose = require("mongoose");
require("./student-model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to ", process.env.DB_NAME);
})
