const mongoose = require("mongoose")
require("./games-model");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("mongoose connected to ", process.env.DB_NAME);
});

mongoose.connection.on("disconnected",function(){
    console.log("mongoose disconnected ");
})
mongoose.connection.on("error", function(error){
    console.log("mongoose cannot connect to database ", process.env.DB_NAME, "error :",error) ;
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MSG);
    });
});

process.on("SIGURG", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MSG2);
    })
    
});