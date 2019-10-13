const { fetchTopics, addTopic } = require("../models/topicsModel");

const getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const postTopic = (req, res, next) => {
  addTopic(req.body)
    .then(topic => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

module.exports = { getTopics, postTopic };
