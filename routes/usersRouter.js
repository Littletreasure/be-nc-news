const usersRouter = require("express").Router();
const {
  getUsersByUsername,
  getUsers,
  postUser
} = require("../controllers/usersController");
const { send405Error } = require("../errors/index");

usersRouter
  .route("/")
  .get(getUsers)
  .post(postUser);
usersRouter.all("/", send405Error);

usersRouter.route("/:username").get(getUsersByUsername);
usersRouter.all("/", send405Error);

module.exports = usersRouter;
