const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/articlesController");
const { send405Error } = require("../errors/index");

articlesRouter.get("/:article_id", getArticlesById);
articlesRouter.patch("/:article_id", patchArticleVoteCount);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.get("/", getArticles);
articlesRouter.all("/", send405Error);

module.exports = articlesRouter;
