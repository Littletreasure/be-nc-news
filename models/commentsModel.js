const connection = require("../db/connection");

const updateCommentVoteCount = ({ comment_id }, { inc_votes }) => {
  return connection("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => comment[0]);
};

const removeCommentById = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", comment_id)
    .del();
};

module.exports = { updateCommentVoteCount, removeCommentById };
