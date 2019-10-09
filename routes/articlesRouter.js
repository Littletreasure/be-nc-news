const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId
} = require("../controllers/articlesController");

articlesRouter.get("/:article_id", getArticlesById);
articlesRouter.patch("/:article_id", patchArticleVoteCount);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);

module.exports = articlesRouter;
