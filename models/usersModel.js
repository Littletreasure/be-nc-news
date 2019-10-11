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

module.exports = { fetchUsersByUsername };
