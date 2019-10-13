const connection = require("../db/connection");

const fetchUsersByUsername = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (!user[0]) {
        return Promise.reject({
          status: 404,
          msg: `User not found!`
        });
      }
      return user[0];
    });
};

const fetchUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then(users => {
      return users;
    });
};

const addUser = user => {
  return connection
    .insert(
      [
        {
          username: user.username,
          avatar_url: user.avatar_url,
          name: user.name
        }
      ],
      ["*"]
    )
    .into("users")
    .then(user => {
      return user[0];
    });
};

module.exports = { fetchUsersByUsername, fetchUsers, addUser };
