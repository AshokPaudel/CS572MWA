const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);

const getAll = function (req, res) {
    console.log("all novels requested");
    const limit = 5;
    Novel.find().limit(limit).exec(function (err, data) {
        console.log("Novel data received from db ", data);
        res.status(200).json({ "message": data });
    });
};

const getOne = function (req, res) {
    console.log("One novel is requested");
    const novelId = req.params.novelId;
    console.log("Novel Id is ", novelId, "type of id :", typeof novelId);

    Novel.findById((novelId)).exec(function (err, data) {
        console.log("single novel data retrieved from database ", data, "error : ", err);
        res.status(200).json(data);
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
const deleteOne = function (req, res){
    console.log("delete one game request received");
    const novelId= req.params.novelId;
    Novel.findByIdAndDelete(novelId).exec(function(err, deletedNovel){
        const response = {status:204, message:"Novel Deleted"};
        if(err){
            console.log("error deleting game ", err);
            response.status=500;
            response.message="error deleting game";
        }else if(!deletedNovel){
            console.log("Novel Id not found");
            response.status=404;
            response.message="Novel Id doesn't exist"
        };
        res.status(response.status).json(response.message);
    });
}
const updateOne = function(req, res){
    console.log("update one request received for noveiId : ", req.params.novelId);
    console.log("request body params", req.body);
    const novelId = req.params.novelId;
    //check if valid id
    if(!mongoose.isValidObjectId(novelId)){
        console.log("Invalid novelId");
        return res.status(400).json({"message ":"Invalid Id"});
    }
    // create Json of novel
    let toUpdateNovel={};
    if(req.body.title) toUpdateNovel.title=req.body.title;
    if(req.body.page) toUpdateNovel.numberOfPages=req.body.page;
    if(req.body.authors)toUpdateNovel.authors=req.body.authors;

    console.log("toUpdateNovel = ", toUpdateNovel);

    //update now
    Novel.findByIdAndUpdate(novelId,toUpdateNovel).exec(function(error,updatedNovel){
        const response = {"status":204, "message":`${toUpdateNovel}`};
        console.log("updated Novel : ", toUpdateNovel);
        if(error){
            console.log("error updating novel ",error)
            response.status=500;
            response.message("error while updating the novel");
        }else if(!updatedNovel){
            console.log("Novel id doesn't exist");
            response.status=404;
            response.message="Novel Id doesn't exist";
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