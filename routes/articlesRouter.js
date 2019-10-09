const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticleVoteCount
} = require("../controllers/articlesController");

articlesRouter.get("/:article_id", getArticlesById);
articlesRouter.patch("/:article_id", patchArticleVoteCount);

module.exports = articlesRouter;
