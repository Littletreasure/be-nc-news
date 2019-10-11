const {
  updateCommentVoteCount,
  removeCommentById,
  fetchCommentById
} = require("../models/commentsModel");

const patchCommentVoteCount = (req, res, next) => {
  updateCommentVoteCount(req.params, req.body)
    .then(comment => {
      res.status(200).send({ comment });
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

const getCommentById = (req, res, next) => {
  fetchCommentById(req.params)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = { patchCommentVoteCount, deleteCommentById, getCommentById };
