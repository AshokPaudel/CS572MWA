const express = require("express");
const routes = express.Router();
const novelController = require("../controller/novel.controller");
const authorController = require("../controller/author.controller");
routes.route("/novel")
    .get(novelController.getAll)
    .post(novelController.addOne);

routes.route("/novel/:novelId")
    .get(novelController.getOne)
    .delete(novelController.deleteOne)
    .put(novelController.updateOne);

routes.route("/novel/:novelId/authors")
    .get(authorController.getAuthors)
    .post(authorController.addOneAuthor);

routes.route("/novel/:novelId/authors/:authorId")
    .get(authorController.getOne)
    .delete(authorController.deleteOne)
    .put(authorController.updateOne);

module.exports = routes;

//module.exports = {
    // routes //This is cause error
// }/api/novel/6248c4a880e86469eeded2cb