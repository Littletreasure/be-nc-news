const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/usersController");
const { send405Error } = require("../errors/index");

usersRouter.get("/:username", getUsersByUsername);
usersRouter.all("/", send405Error);

module.exports = usersRouter;
