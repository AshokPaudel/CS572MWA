const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);

const getAll = function (req, res) {
    console.log("all novels requested");
    const response = {
        status: 200,
        message: {}
    };
    let offset = 0;
    let count = 5;
    const maxCount = 10;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    console.log(`offset = ${offset} count = ${count}`);
    if (isNaN(offset) || isNaN(count)) {
        console.log("offset or number is not a number");
        response.status = 400;
        response.message = "offset and count must be digits";
    }
    if (count > maxCount) {
        console.log("count is greater than max");
        response.status = 400;
        response.message = "count must not be great than " +maxCount;
    }
    if (response.status != 200) {
        return res.status(response.status).json(response.message);
    } else {
        Novel.find().limit(count).exec(function (err, data) {
            console.log("Novel data received from db ", data);
            if(err){
                response.status=500;
                response.message="Error fetching data";
                // res.status(500).status({"message":"Error fetching data"})
            }else if(!data){
                res.status=404;
                res.message="Data doesn't exist";
                res.status(404).json({"message":"Data doesn't exist"});
            }else{
                console.log("Novel data received from db ", data);
                // res.status(200).json({ "message": data });
                response.status=200;
                response.message=data;
            }
            res.status(response.status).json(response.message);
        });
       
    }
};

const getOne = function (req, res) {
    console.log("One novel is requested");
    const novelId = req.params.novelId;
    console.log("Novel Id is ", novelId, "type of id :", typeof novelId);
    if( !mongoose.isValidObjectId(novelId)){
        console.log("not a valid id");
        return res.status(400).json({ "message": "not a valid ID" });
    }

    Novel.findById((novelId)).exec(function (err, data) {
        console.log("single novel data retrieved from database ", data, "error : ", err);
        if (err) {
            console.log("error reading games from database");
            res.status(500).json(err);
            return;
        } else if(data) {
           return res.status(200).json(data);
        }else{
            console.log("novelId is null");
            return res.status(404).json({ "messsage": "Game with given ID not found" });
        }

    })
}
const addOne = function (req, res) {
    console.log("Add one Novel request received");
    console.log(req.body);
    const newNovel = {
        title: req.body.title,
        numberOfPages: parseInt(req.body.page),
        authors: req.body.authors
    };
    console.log(newNovel);
    Novel.create(newNovel, function (err, novel) {
        if (err) {
            console.log("Error adding the game ", err);
            res.status(500).json("Error occurred while adding the novel");
        } else {
            console.log("novel added successfully", novel)
            res.status(200).json(novel);
        }
    });

}
const deleteOne = function (req, res) {
    console.log("delete one game request received");
    const novelId = req.params.novelId;
    Novel.findByIdAndDelete(novelId).exec(function (err, deletedNovel) {
        const response = { status: 204, message: "Novel Deleted" };
        if (err) {
            console.log("error deleting game ", err);
            response.status = 500;
            response.message = "error deleting game";
        } else if (!deletedNovel) {
            console.log("Novel Id not found");
            response.status = 404;
            response.message = "Novel Id doesn't exist"
        };
        res.status(response.status).json(response.message);
    });
}
const updateOne = function (req, res) {
    console.log("update one request received for noveiId : ", req.params.novelId);
    console.log("request body params", req.body);
    const novelId = req.params.novelId;
    //check if valid id
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("Invalid novelId");
        return res.status(400).json({ "message ": "Invalid Id" });
    }
    // create Json of novel
    let toUpdateNovel = {};
    if (req.body.title) toUpdateNovel.title = req.body.title;
    if (req.body.page) toUpdateNovel.numberOfPages = req.body.page;
    if (req.body.authors) toUpdateNovel.authors = req.body.authors;

    console.log("toUpdateNovel = ", toUpdateNovel);

    //update now
    Novel.findByIdAndUpdate(novelId, toUpdateNovel).exec(function (error, updatedNovel) {
        const response = { "status": 204, "message": `${toUpdateNovel}` };
        console.log("updated Novel : ", toUpdateNovel);
        if (error) {
            console.log("error updating novel ", error)
            response.status = 500;
            response.message("error while updating the novel");
        } else if (!updatedNovel) {
            console.log("Novel id doesn't exist");
            response.status = 404;
            response.message = "Novel Id doesn't exist";
        }
        res.status(response.status).json(response.message);
    });

}
module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    updateOne
}