const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function () {

    if (get() == null) {
        MongoClient.connect(process.env.DB_URL, function (err, client) {
            if (err) {
                console.log("Error connecting to database");
                return;
            } else {
                _connection = client.db(process.env.DB_NAME);
                console.log("DB connection successfull");
            }
        })
    }
}

const get = function () {
    return _connection;
}
module.exports={
    get,
    open
}