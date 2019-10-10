const commentsRouter = require("express").Router();
const {
  patchCommentVoteCount,
  deleteCommentById
} = require("../controllers/commentsController");

commentsRouter.patch("/:comment_id", patchCommentVoteCount);
commentsRouter.delete("/:comment_id", deleteCommentById);

module.exports = commentsRouter;
