const articlesRouter = require("express").Router();
const { getArticlesById } = require("../controllers/articlesController");

articlesRouter.get("/:article_id", getArticlesById);

module.exports = articlesRouter;
