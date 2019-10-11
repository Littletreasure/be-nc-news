const articlesRouter = require("express").Router();
const {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
} = require("../controllers/articlesController");
const { send405Error } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticleVoteCount)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(getArticles)
  .all(send405Error);

module.exports = articlesRouter;
