const commentsRouter = require("express").Router();
const {
  patchCommentVoteCount,
  deleteCommentById
} = require("../controllers/commentsController");
const { send405Error } = require("../errors/index");

commentsRouter.patch("/:comment_id", patchCommentVoteCount);
commentsRouter.delete("/:comment_id", deleteCommentById);
commentsRouter.all("/", send405Error);

module.exports = commentsRouter;
