const express = require("express");
const routes = express.Router();
const novelController = require("../controller/novel.controller");
const authorController = require("../controller/author.controller");
routes.route("/novels")
    .get(novelController.getAll)
    .post(novelController.addOne);

routes.route("/novels/:novelId")
    .get(novelController.getOne)
    .delete(novelController.deleteOne)
    .put(novelController.updateOne);

routes.route("/novels/:novelId/authors")
    .get(authorController.getAuthors)
    .post(authorController.addOneAuthor);

routes.route("/novels/:novelId/authors/:authorId")
    .get(authorController.getOne)
    .delete(authorController.deleteOne)
    .put(authorController.updateOne);

module.exports = routes;
