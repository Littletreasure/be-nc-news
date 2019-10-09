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
      return article[0];
    });
};

const updateArticleVoteCount = (article_id, { inc_votes }) => {
  return Promise.all([fetchArticlesById(article_id), inc_votes]).then(
    ([article, inc_votes]) => {
      article.votes = inc_votes;
      return { article };
    }
  );
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

module.exports = {
  fetchArticlesById,
  updateArticleVoteCount,
  addCommentByArticleId,
  fetchCommentsByArticleId
};
