const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);
const sendResponse = require("./novel.controller").sendResponse;
const dataReadWriteInternalError = require("./novel.controller").dataReadWriteInternalError;
const novelUpdateSuccess=  require("./novel.controller").novelUpdateSuccess;

const _returnAuthors = function (novel, res, response) {
    if (!novel.authors) {
        response.status = parseInt(process.env.RESOURCE_NOT_FOUND_STATUS);
        response.message = process.env.AUTHOR_NOT_FOUND_FOR_NOVEL_MSG;
    } else {
        response.message = novel.authors
    }
}
const _resourceFindFail = function (error, response) {
    response.status = parseInt(process.env.INTERNAL_SERVER_ERROR);
    response.message = error;
}
const _addAuthorSendResponse = function (req, res,response, novel) {
    console.log("Found novel is ",novel);
    const newAuthor = {};
    if (req.body.name) newAuthor.name = req.body.name;
    if (req.body.country) newAuthor.country = req.body.country;
    novel.authors.push(newAuthor);
    console.log("Pushed authors ",novel.authors);
    _saveNovelSendResponse(novel, res, response);
}
const _saveNovelSendResponse = function (novel,res, response) {
    console.log("At _saveNovelSendResponse novel : ");
    novel.save().then((updatedNovel) => novelUpdateSuccess(updatedNovel, res,response))
        .catch((error) => dataReadWriteInternalError(error, res, response))
        // .finally(() => sendResponse(res, response));
}

const _updateAuthor = function (req, res, response, novel, authorId) {
    console.log("At _updateAuthor Novel :", " request body", req.body);
    // const authorId = req.params.authorId;
    if (!novel.authors.id(authorId)) {
        console.log("author doesn't exist");
        response.status = parseInt(process.env.RESOURCE_NOT_FOUND_STATUS);
        response.message = process.env.AUTHOR_NOT_FOUND_BYID_MSG;
        sendResponse(res,response);
    } else {
        novel.authors =
            novel.authors.map(author => {
                if (author._id == authorId) {
                    return { ...req.body, ...author };
                } return author;
            });
        console.log("Update novel authors", novel.authors);
        _saveNovelSendResponse(novel,res, response);

    }

}

const _deleteAuthor = function (res, response, novel, authorId) {
    console.log("At deleteAuthor novel is :", novel);
    console.log("Author ID to remove ", authorId);
    if (!novel.authors.id(authorId)) {
        response.status = parseInt(process.env.RESOURCE_NOT_FOUND_STATUS);
        response.message = process.env.AUTHOR_NOT_FOUND_BYID;
        console.log("author doesn't exist");
        sendResponse(res,response);
    } else {
        novel.authors = novel.authors.filter(author => author._id != authorId);
        _saveNovelSendResponse(novel,res, response);
    }
}
const _returnAuthorById = function (novel, authorId, res, response) {
    if (!novel.authors.id(authorId)) {
        _resourceFindFail(process.env.AUTHOR_NOT_FOUND_BYID, response);
    } else {
        response.message = novel.authors.id(authorId);
    }
}
const _findNovelAndDeleteAuthor = function (novel, res, response, authorId) {
    if (!novel) {
        response.status = parseInt(process.env.RESOURCE_NOT_FOUND_STATUS)
        response.message = process.env.NOVEL_NOT_FOUND_BYID_MSG;
        sendResponse()
    } else {
        _deleteAuthor(res, response, novel, authorId)
    }
}
const _findNovelAndUpdateAuthor = function (req, res, response, novel, authorId) {
    console.log("At _findNovelAndUpdateAuthor ", novel);
    if (!novel) {
        response.status = parseInt(process.env.RESOURCE_NOT_FOUND_STATUS);
        response.message = process.env.NOVEL_NOT_FOUND_BYID_MSG;
    } else {
        console.log("Novel exists");
        _updateAuthor(req, res, response, novel, authorId)
    }
}

const getAuthors = function (req, res) {
    console.log("Get all author request received");
    const novelId = req.params.novelId;
    console.log("novel id = ", novelId);
    const response = { status: parseInt(process.env.OK), message: "" };
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("Invalid novelId");
        response.status = parseInt(process.env.INVALID_OBJECT_ID_STATUS);
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    } else {
        Novel.findById(novelId).select("authors").then((novel) => _returnAuthors(novel, res, response))
            .catch((error) => dataReadWriteInternalError(error, response))
            .finally(() => sendResponse(res, response));
    }
};
const addOneAuthor = function (req, res) {
    console.log("Add one auther requested ", req.params, req.body);
    const novelId = req.params.novelId;
    const response = {
        status: parseInt(process.env.DATA_CREATE_SUCCESS),
        message: {}
    };
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("invalid NovelId");
        response.status = parseInt(process.env.INVALID_OBJECT_ID_STATUS);
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    } else {
        Novel.findById(novelId).select("authors")
            .then((novel) => _addAuthorSendResponse(req, res, response,novel))
            .catch((error) => dataReadWriteInternalError(error,res, response))
        // .finally(()=>sendResponse(res,response));
    }
};

const getOne = function (req, res) {
    console.log("Get one author called");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    const response = { status: parseInt(process.env.OK), message: "" };
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
        console.log("invalid  novel or author");
        response.status = process.env.INVALID_OBJECT_ID_STATUS;
        response.message = process.env.INVALID_OBJECT_ID_MSG
        sendResponse(res, response)
    } else {
        Novel.findById(novelId).select("authors")
            .then((novel) => _returnAuthorById(novel, authorId, res, response))
            .catch((error) => dataReadWriteInternalError(error, response))
            .finally(() => sendResponse(res, response));
    }
}

const deleteOne = function (req, res) {
    console.log("delete One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    const response = { status: parseInt(process.env.OK), message: "" };
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
        console.log("invalid  novel or author");
        response.status = process.env.INVALID_OBJECT_ID_STATUS;
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    }
    else {
        Novel.findById(novelId).select("authors").then((novel) => _findNovelAndDeleteAuthor(novel, res, response, authorId))
            .catch(error => dataReadWriteInternalError(error, response))
            // .finally(() => sendResponse(res, response));
    }

}
const updateOne = function (req, res) {
    console.log("update One Author request received");
    const novelId = req.params.novelId;
    const authorId = req.params.authorId;
    const response = {
        status: process.env.DATA_UPDATE_SUCCESS,
        message: {}
    };
    if (!(mongoose.isValidObjectId(novelId) && mongoose.isValidObjectId(authorId))) {
        console.log("invalid  novel or author");
        response.status = proces.env.INVALID_OBJECT_ID_STATUS;
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    } else if (!req.body.name) {
        console.log("new author doesn't contains name");
        response.status = process.env.INVALID_FORM_INPUT_STATUS;
        response.message = process.env.INVALID_FORM_INPUT_MSG;
        sendResponse(res, response);
    }
    else {
        Novel.findById(novelId).select("authors")
            .then((novel) => _findNovelAndUpdateAuthor(req, res, response, novel, authorId))
            .catch(error => dataReadWriteInternalError(error, response))
    }
}

module.exports = {
    getAuthors,
    addOneAuthor,
    getOne,
    deleteOne,
    updateOne
}
