const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);

const getAuthors = function (req, res) {
    console.log("Get all author request received");
    const novelId = req.params.novelId;
    console.log("novel id = ", novelId);
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("Invalid novelId");
        return res.status(400).json({ "message ": "Invalid Id" });
    }
    Novel.findById(novelId).select("authors").exec(function (err, authors) {
        console.log("fetched authors : ", authors);
        const response = { status: 200, message: authors };
        if (err) {
            console.log("error fetching authors ", err);
            response.status=400;
            response.message="Error finding authors";
            // return res.status(404).json({ "message": "Error finding authors" });
        }else if(!authors){
            response.status = 404;
            response.message = "Author doesn't exist for the given novelId";
            console.log("author doesn't exist for the id", novelId);
        }
        //  else {
        //     return res.status(200).json(authors);
        // }
        return res.status(response.status).json(response.message);
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
            console.log("Error finding author ", err);
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
    _saveNovel(res, novel);
}

const _saveNovel = function (res, novel) {
    console.log("At _savenovel novel : ", novel);
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

const _updateAuthor = function (req, res, novel) {
    console.log("At _updateAuthor Novel : request body", req.body);
    const authorId = req.params.authorId;
    if(!novel.authors.id(authorId)){
        console.log("author doesn't exist");
        return res.status(404).json({"message" : "author not found for given author Id"});
    }
    if (!req.body.name) {
        console.log("new author doesn't contains name");
        return res.status(400).json({ message: "Author name is required" });
    }
    // if (req.body.country) newAuthor.country = req.body.country;
    novel.authors =
        novel.authors.map(author => {
            if (author._id == authorId) {
                return { ...req.body, ...author };
            } return author;

        });
    console.log("Update novel authors", novel.authors);
    _saveNovel(res, novel);
}

const _deleteAuthor = function (req, res, novel, authorId) {
    console.log("At deleteAuthor novel is :", novel);
    console.log("Author ID to remove ", authorId);
    if(!novel.authors.id(authorId)){
        console.log("author doesn't exist");
        return res.status(404).json({"message" : "author not found for given author Id"});
    }
    novel.authors = novel.authors.filter(author => author._id != authorId);
    _saveNovel(res, novel);

}

const getOne = function (req, res) {
    console.log("Get one author called");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
        console.log("invalid  novel or author");
        return res.status(404).json({ "message": "Please provide valid id for novel and author" });
    }
    const response = {status:200,message:"default message"};
    Novel.findById(novelId).select("authors").exec( function(err,novel) {
       
        if (err){
            response.status=500;
            response.message="Something went wrong";
            console.log("error finding author ", error);
        }else {
         if(novel) {
            console.log("found novel");
            if(novel.authors.id(authorId)){
                console.log("found Author Id");
                response.message=novel.authors.id(authorId);
            }else{
                response.status=404;
                response.message="Author not found for given Id";
                console.log("Author not found for given Id");
            }
            
        }else{
            console.log("Novel not found for given Id");
            response.status=404;
            response.message="Novel not found for given Id";
        }
    }
    res.status(response.status).json(response.message);
    });
   
}

const deleteOne = function (req, res) {
    console.log("delete One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
        console.log("invalid  novel or author");
        return res.status(404).json({ "message": "Please provide valid id for novel and author" });
    }
    Novel.findById(novelId).select("authors").exec(function (err, novel) {
        const response = { status: 200, message: novel };
        if (err) {
            console.log("Error finding Novel ", err);
            response.status = 500;
            response.message = "Error Finding Novel";
        } else if (!novel) {
            response.status = 404;
            response.message = "Error Finding Novel";
            console.log("novel doesn't exist for the id", novelId);
        }
        if (novel) {
            _deleteAuthor(req, res, novel, authorId);
        } else {
            res.status(response.status).json(response.message);
        }
    });

}
const updateOne = function (req, res) {
    console.log("update One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
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
