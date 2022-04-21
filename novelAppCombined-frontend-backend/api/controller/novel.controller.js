const mongoose = require("mongoose");
const Novel = mongoose.model(process.env.DB_MODEL);

const getAll = function (req, res) {
    console.log("all novels requested");
    const response = {
        status: parseInt(process.env.OK),
        message: {}
    };
    let offset = parseInt(process.env.OFFSET);
    let count = parseInt(process.env.COUNT);
    const maxCount = parseInt(process.env.MAX_COUNT);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    console.log(`offset = ${offset} count = ${count}`);
    if (isNaN(offset) || isNaN(count)) {
        console.log("offset or count is not a number");
        response.status = parseInt(process.env.INVALID_OFFSET_COUNT_STATUS);
        response.message = process.env.INVALID_OFFSET_COUNT_MSG;
    }
    if (count > maxCount) {
        console.log("count is greater than max");
        response.status = parseInt(process.env.INVALID_OFFSET_COUNT_STATUS);
        response.message = process.env.MAX_COUNT_MSG;
    }
    if (response.status != parseInt(process.env.OK)) {
        sendResponse(res, response);
        // return res.status(response.status).json(response.message);
    }else if(req.query && req.query.search) {
        _runNovelQuery(res,response,req.query.search,offset.count);
    }
    else {
        Novel.find().skip(offset).limit(count)
            .then((data) => _novelFindSuccess(data, res, response))
            .catch((err) => dataReadWriteInternalError(err, res, response))
            // .finally(() => sendResponse(res, response))
    }
};

const _runNovelQuery = function(res,response,title,offset,count){
    const query = {
        "title": {$regex: title}
    };
    Novel.find(query)
    .limit(count).then((data)=>_novelFindSuccess(data,res,response))
    .catch((err) => dataReadWriteInternalError(err, res, response))
    // .finally(() => sendResponse(res, response))
}

const _novelFindSuccess = function (data, res, response) {
    console.log("At _novelFindSuccess");
    response.message = data;
    sendResponse(res, response);
}
const sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}
const dataReadWriteInternalError = function (err, res, response) {
    console.log("Data Read Write Error: ",err);
    response.status = parseInt(process.env.INTERNAL_SERVER_ERROR);
    response.message = err;
    sendResponse(res, response);
}
const getOne = function (req, res) {
    console.log("One novel is requested");
    const novelId = req.params.novelId;
    console.log("Novel Id is ", novelId, "type of id :", typeof novelId);
    const response = {
        status: parseInt(process.env.OK),
        message: {}
    };
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("not a valid id");
        response.status = parseInt(process.env.INVALID_OBJECT_ID_STATUS);
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    } else {
        Novel.findById(novelId)
            .then((data) => _novelFindSuccess(data, res, response))
            .catch((err) => dataReadWriteInternalError(err, res, response))
            // .finally(() => sendResponse(res, response));
    }
}
const addOne = function (req, res) {
    console.log("Add one Novel request received");
    console.log(req.body);
    // validation will be done by schema
    const newNovel = {
        ...req.body
    };
    const response = {
        status: parseInt(process.env.DATA_CREATE_SUCCESS),
        message: {}
    };

    console.log(newNovel);
    Novel.create(newNovel).then((createdNovel) => _novelCreateSuccess(createdNovel, res, response))
        .catch((error) => dataReadWriteInternalError(error, res, response))
    // .finally(() => sendResponse(res, response));
}

const _novelCreateSuccess = function (createdNovel, res, response) {
    console.log("novel added successfully", createdNovel)
    response.message = createdNovel;
    sendResponse(res, response)
}

const _novelDeleteSuccess = function (deletedNovel, response) {
    console.log("novel deleted successfully", deletedNovel);
    if (!deletedNovel) {
        response.status = parseInt(RESOURCE_NOT_FOUND_STATUS);
        response.message = process.env.NOVEL_NOT_FOUND_BYID_MSG;
    } else {
        response.message = "Novel deleved: " + deletedNovel;
    }
}

const deleteOne = function (req, res) {
    console.log("delete one Novel request received");
    const novelId = req.params.novelId;
    const response = {
        status: parseInt(process.env.OK),
        message: {}
    };

    Novel.findByIdAndDelete(novelId).then((deletedNovel) => _novelDeleteSuccess(deletedNovel, response))
        .catch((error) => dataReadWriteInternalError(error, response))
        .finally(() => sendResponse(res, response));
}
const updateOne = function (req, res) {
    console.log("update one request received for noveiId : ", req.params.novelId);
    console.log("request body params", req.body);
    const novelId = req.params.novelId;
    const response = {
        status: process.env.DATA_UPDATE_SUCCESS,
        message: {}
    };
    //check if valid id
    if (!mongoose.isValidObjectId(novelId)) {
        console.log("Invalid novelId");
        response.status = parseInt(process.env.INVALID_OBJECT_ID_STATUS);
        response.message = process.env.INVALID_OBJECT_ID_MSG;
        sendResponse(res, response);
    } else {
        //find and update
        Novel.findById(novelId).then((novel) => _updateAndSave(novel, req, res, response))
            .catch((error) => dataReadWriteInternalError(error, res, response))
    }
}
const _updateAndSave = function (novel, req, res, response) {
    Novel.updateOne({ _id: req.params.novelId })
    console.log("At update and save ", req.params.novelId, novel);
    // const toUpdate = {...req.body.params};
    novel.title = req.body.title;
    novel.numberOfPages = req.body.numberOfPages;
    novel.authors = req.body.authors;
    novel.save()
        .then((updatedNovel) => _novelUpdateSuccess(updatedNovel, response))
        .catch((error, response) => dataReadWriteInternalError(error, response))
        .finally(() => sendResponse(res, response));
}
const _novelUpdateSuccess = function (updatedNovel, response) {
    console.log("Updated novel ", updatedNovel);
    response.message = updatedNovel;
    console.log("response message ", response.message);
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    updateOne,
    dataReadWriteInternalError: dataReadWriteInternalError,
    sendResponse: sendResponse
}