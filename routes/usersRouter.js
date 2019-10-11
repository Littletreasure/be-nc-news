const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/usersController");
const { send405Error } = require("../errors/index");

usersRouter.route("/:username").get(getUsersByUsername);
usersRouter.all("/", send405Error);

module.exports = usersRouter;
