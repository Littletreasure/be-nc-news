const {
  updateCommentVoteCount,
  removeCommentById
} = require("../models/commentsModel");

const patchCommentVoteCount = (req, res, next) => {
  updateCommentVoteCount(req.params, req.body)
    .then(comment => {
      res.status(202).send({ comment });
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  removeCommentById(req.params)
    .then(response => {
      res.sendStatus(204);
    })
    .catch(next);
};

module.exports = { patchCommentVoteCount, deleteCommentById };
