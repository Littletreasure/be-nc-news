const connection = require("../db/connection");

const fetchUsersByUsername = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("username", username);
};

module.exports = { fetchUsersByUsername };
