const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/articlesController");

articlesRouter.get("/:article_id", getArticlesById);
articlesRouter.patch("/:article_id", patchArticleVoteCount);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);

module.exports = articlesRouter;
