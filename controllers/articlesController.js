const {
  fetchArticlesById,
  updateArticleVoteCount,
  addCommentByArticleId,
  fetchCommentsByArticleId,
  fetchArticles
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
      res.status(200).send({ article });
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

const getCommentsByArticleId = (req, res, next) => {
  fetchCommentsByArticleId(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = {
  getArticlesById,
  patchArticleVoteCount,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles
};
