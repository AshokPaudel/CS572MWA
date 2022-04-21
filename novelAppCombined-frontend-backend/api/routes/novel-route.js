const express = require("express");
const routes = express.Router();

const novelController = require("../controller/novel.controller");
const authorController = require("../controller/author.controller");
const authenticateController = require("../controller/authenticate.controller");
routes.route("")
    .get(novelController.getAll)
    .post(authenticateController.authenticate, novelController.addOne);

routes.route("/:novelId")
    .get(novelController.getOne)
    .delete(authenticateController.authenticate,novelController.deleteOne)
    .put(authenticateController.authenticate,novelController.updateOne);

routes.route("/:novelId/authors")
    .get(authorController.getAuthors)
    .post(authenticateController.authenticate,authorController.addOneAuthor);

routes.route("/:novelId/authors/:authorId")
    .get(authorController.getOne)
    .delete(authenticateController.authenticate,authorController.deleteOne)
    .put(authenticateController.authenticate,authorController.updateOne);

module.exports = routes;
