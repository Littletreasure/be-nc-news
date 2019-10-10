const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topicsController");
const { send405Error } = require("../errors/index");

topicsRouter.get("/", getTopics);
topicsRouter.all("/", send405Error);

module.exports = topicsRouter;
