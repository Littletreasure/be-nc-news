const topicsRouter = require("express").Router();
const { getTopics, postTopic } = require("../controllers/topicsController");
const { send405Error } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .post(postTopic)
  .all(send405Error);

module.exports = topicsRouter;
