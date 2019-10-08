const { fetchUsersByUsername } = require("../models/usersModel");

const getUsersByUsername = (req, res, next) => {
  fetchUsersByUsername(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUsersByUsername };
