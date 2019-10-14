const commentsRouter = require("express").Router();
const {
  patchCommentVoteCount,
  deleteCommentById,
  getCommentById
} = require("../controllers/commentsController");
const { send405Error } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentVoteCount)
  .delete(deleteCommentById)
  .get(getCommentById)
  .all(send405Error);

module.exports = commentsRouter;
