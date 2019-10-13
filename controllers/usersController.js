const {
  fetchUsersByUsername,
  fetchUsers,
  addUser
} = require("../models/usersModel");

const getUsersByUsername = (req, res, next) => {
  fetchUsersByUsername(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  addUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};

module.exports = { getUsersByUsername, getUsers, postUser };
