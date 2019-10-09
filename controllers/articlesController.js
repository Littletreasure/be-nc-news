const {
  fetchArticlesById,
  updateArticleVoteCount,
  addCommentByArticleId
} = require("../models/articlesModel");

const getArticlesById = (req, res, next) => {
  fetchArticlesById(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticleVoteCount = (req, res, next) => {
  updateArticleVoteCount(req.params, req.body)
    .then(article => {
      res.status(202).send({ article });
    })
    .catch(next);
};

const postCommentByArticleId = (req, res, next) => {
  addCommentByArticleId(req.params, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId
};
