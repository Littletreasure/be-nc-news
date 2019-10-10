const commentsRouter = require("express").Router();
const {
  patchCommentVoteCount,
  deleteCommentById,
  getCommentById
} = require("../controllers/commentsController");
const { send405Error } = require("../errors/index");

commentsRouter.patch("/:comment_id", patchCommentVoteCount);
commentsRouter.delete("/:comment_id", deleteCommentById);
commentsRouter.get("/:comment_id", getCommentById);
commentsRouter.all("/", send405Error);

module.exports = commentsRouter;
