const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);

const getAuthors = function (req, res) {
    console.log("Get all author request received");
    const novelId = req.params.novelId;
    console.log("novel id = ", novelId);
    Novel.findById(novelId).select("authors").exec(function (err, authors) {
        console.log("fetched authors : ", authors);
        if (err) {
            console.log("error fetching authors ", err);
            return res.status(404).json({ "message": "Error finding authors" });
        } else {
            return res.status(200).json(authors);
        }
    })
};
const addOneAuthor = function (req, res) {
    console.log("Add one auther requested ", req.params, req.body);
    const novelId = req.params.novelId;
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("invalid NovelId");
        return res.status(400).json({ "message": "invalid novel id" });
    }

    Novel.findById(novelId).select("authors").exec(function (err, novel) {
        const response = { status: 200, message: novel };
        if (err) {
            console.log("Error finding game ", err);
            response.status = 500;
            response.message = "Error Finding Novel";
        } else if (!novel) {
            response.status = 404;
            response.message = "Error Finding Novel";
            console.log("novel doesn't exist for the id", novelId);
        }
        if (novel) {
            _addAuthor(req, res, novel);
        } else {
            res.status(response.status).json(response.message);
        }
    });

    // Novel.findByIdAndUpdate(novelId,authors:)
};

const _addAuthor = function (req, res, novel) {
    const newAuthor = {};
    if (req.body.name) newAuthor.name = req.body.name;
    if (req.body.country) newAuthor.country = req.body.country;
    novel.authors.push(newAuthor);
    novel.save(function (err, updatedNovel) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedNovel.authors;
        }
        res.status(response.status).json(response.message);
    })
}

const _saveNovel = function(res,novel){
    novel.save(function (err, updatedNovel) {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 201;
            response.message = updatedNovel.authors;
        }
        res.status(response.status).json(response.message);
    })
}

const  _updateAuthor = function(req,res, novel){

}

const _deleteAuthor = function(req,res,novel, foundAuthor, authorId){

   novel.authors.filter(author => author._id!=authorId);
   _saveNovel(res,novel);

}

const getOne = function (req, res) {
    console.log("Get one author called");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if(!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))){
        console.log("invalid  novel or author");
        return res.status(404).json({ "message": "Please provide valid id for novel and author" });
    }
    Novel.findById(novelId).select("authors").then(novel => {
        const foundAuthor = novel.authors.filter(author => author._id == authorId);
        if (!foundAuthor) return res.status(404).json({ "message": "not found" });
        else res.status(200).json(foundAuthor)
    }, error => {
        res.status(500).json({
            error: error
        });
    });
}

const deleteOne = function(req, res){
    console.log("delete One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if(!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))){
        console.log("invalid  novel or author");
        return res.status(404).json({ "message": "Please provide valid id for novel and author" });
    }
    Novel.findById(novelId).select("authors").then(data => {
        const foundAuthor = data.authors.filter(author => author._id == authorId);
        if (!foundAuthor) return res.status(404).json({ "message": "not found" });
        else res.status(200).json(foundAuthor)
    }, error => {
        res.status(500).json({
            error: error
        });
    });

    

}
const updateOne = function(req, res){
    console.log("update One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if(!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))){
        console.log("invalid  novel or author");
        return res.status(404).json({ "message": "Please provide valid id for novel and author" });
    }
    Novel.findById(novelId).select("authors").exec(function (err, novel) {
        const response = { status: 200, message: novel };
        if (err) {
            console.log("Error finding game ", err);
            response.status = 500;
            response.message = "Error Finding Novel";
        } else if (!novel) {
            response.status = 404;
            response.message = "Error Finding Novel";
            console.log("novel doesn't exist for the id", novelId);
        }
        if (novel) {
            _updateAuthor(req, res, novel);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}


module.exports = {
    getAuthors,
    addOneAuthor,
    getOne,
    deleteOne,
    updateOne
}
