const { fetchArticlesById } = require("../models/articlesModel");

const getArticlesById = (req, res, next) => {
  fetchArticlesById(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { getArticlesById };
