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
  .post(postUser)
  .all(send405Error);

usersRouter
  .route("/:username")
  .get(getUsersByUsername)
  .all(send405Error);

module.exports = usersRouter;
