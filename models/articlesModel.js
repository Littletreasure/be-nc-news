const connection = require("../db/connection");

const fetchArticlesById = ({ article_id }) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.body",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .where("articles.article_id", article_id)
    .then(article => {
      return Promise.all([
        article,
        connection("comments")
          .count("comment_id")
          .where("article_id", article_id)
      ]);
    })
    .then(([article, commentCount]) => {
      article[0].comment_count = parseInt(commentCount[0].count);
      return article[0];
    });
};

module.exports = { fetchArticlesById };
