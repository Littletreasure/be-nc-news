const connection = require("../db/connection");
const { fetchUsersByUsername } = require("./usersModel");

const fetchArticlesById = ({ article_id }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .then(article => {
      if (!article[0]) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}!`
        });
      }
      return article[0];
    });
};

const updateArticleVoteCount = ({ article_id }, { inc_votes }) => {
  if (!inc_votes) inc_votes = 0;

  return connection("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      if (!article[0]) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}!`
        });
      }

      return article[0];
    });
};

const addCommentByArticleId = ({ article_id }, comment) => {
  if (Object.keys(comment).length === 0) {
    return Promise.reject({
      status: 400,
      msg: "No comment to post"
    });
  }
  if (Object.keys(comment).includes("username", "body") === false) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request"
    });
  }
  return connection("users")
    .select("*")
    .where("username", comment.username)
    .then(user => {
      if (!user[0]) {
        return Promise.reject({
          status: 400,
          msg: `Username does not exist`
        });
      }

      return connection
        .insert(
          [
            {
              article_id: article_id,
              author: comment.username,
              body: comment.body
            }
          ],
          ["*"]
        )
        .into("comments")
        .then(comment => {
          return comment[0];
        });
    });
};

const fetchCommentsByArticleId = ({ article_id }, query) => {
  let sortBy = "created_at";
  if (query.sort_by) sortBy = query.sort_by;
  let commentOrder = "desc";
  if (query.order === "asc") commentOrder = "asc";
  let limit = 10;
  if (query.limit) limit = query.limit;
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sortBy, commentOrder)
    .limit(limit)
    .then(comments => {
      if (!comments[0]) {
        return connection
          .select("*")
          .from("articles")
          .where("article_id", article_id)
          .then(article => {
            if (!article[0]) {
              return Promise.reject({
                status: 404,
                msg: `No article found for article_id: ${article_id}!`
              });
            }
            return [];
          });
      }
      return comments;
    });
};

const fetchArticles = query => {
  let sortBy = "created_at";
  if (query.sort_by) sortBy = query.sort_by;
  let articleOrder = "desc";
  if (query.order === "asc") articleOrder = "asc";
  let limit = 10;
  if (query.limit) limit = query.limit;

  return connection
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .orderBy(sortBy, articleOrder)
    .limit(limit)
    .modify(sqlQuery => {
      if (query.author) sqlQuery.where("articles.author", query.author);
      if (query.topic) sqlQuery.where("articles.topic", query.topic);
    })
    .then(articles => {
      if (!articles[0]) {
        if (query.author) {
          return connection("users")
            .select("*")
            .where("username", query.author)
            .then(user => {
              if (!user[0]) {
                return Promise.reject({ status: 404, msg: "Author not found" });
              }
              return [];
            });
        } else if (query.topic) {
          return connection("topics")
            .select("*")
            .where("slug", query.topic)
            .then(topic => {
              if (!topic[0]) {
                return Promise.reject({
                  status: 404,
                  msg: "Topic not found"
                });
              }
              return [];
            });
        }
      }
      return articles;
    });
};

module.exports = {
  fetchArticlesById,
  updateArticleVoteCount,
  addCommentByArticleId,
  fetchCommentsByArticleId,
  fetchArticles
};
