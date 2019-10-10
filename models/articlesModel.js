const connection = require("../db/connection");

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
  return connection("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      return article[0];
    });
};

const addCommentByArticleId = ({ article_id }, comment) => {
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
};

const fetchCommentsByArticleId = ({ article_id }, query) => {
  let sortBy = "created_at";
  if (query.sort_by) sortBy = query.sort_by;
  let commentOrder = "desc";
  if (query.order === "asc") commentOrder = "asc";
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sortBy, commentOrder);
};

const fetchArticles = query => {
  let sortBy = "created_at";
  if (query.sort_by) sortBy = query.sort_by;
  let articleOrder = "desc";
  if (query.order === "asc") articleOrder = "asc";

  return connection
    .select("articles.*")
    .from("articles")
    .groupBy("articles.article_id")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .orderBy(sortBy, articleOrder)
    .modify(sqlQuery => {
      if (query.author) sqlQuery.where("articles.author", query.author);
      if (query.topic) sqlQuery.where("articles.topic", query.topic);
    });
};

module.exports = {
  fetchArticlesById,
  updateArticleVoteCount,
  addCommentByArticleId,
  fetchCommentsByArticleId,
  fetchArticles
};
