const connection = require("../db/connection");

const updateCommentVoteCount = ({ comment_id }, { inc_votes }) => {
  if (!inc_votes) inc_votes = 0;
  return connection("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (!comment[0]) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for comment_id: ${comment_id}!`
        });
      }
      return comment[0];
    });
};

const removeCommentById = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", comment_id)
    .del();
};

const fetchCommentById = ({ comment_id }) => {
  return connection("comments").where("comment_id", comment_id);
};

module.exports = {
  updateCommentVoteCount,
  removeCommentById,
  fetchCommentById
};
