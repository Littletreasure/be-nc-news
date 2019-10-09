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

module.exports = { fetchArticlesById, updateArticleVoteCount };
