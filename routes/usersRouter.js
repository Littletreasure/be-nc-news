const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/usersController");

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
