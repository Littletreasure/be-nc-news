process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET / returns 200 and returns with an array of objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.be.an("object");
          expect(body.topics[0]).to.contain.keys("slug", "description");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET /:username returns 200 and a user object", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an("object");
          expect(body.user).to.contain.keys("username", "avatar_url", "name");
        });
    });
  });
  describe("/articles/:article_id", () => {
    it("GET /:article_id returns 200 and an article object with a comment count property", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an("object");
          expect(body.article).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("PATCH /:article_id returns 200 and accepts a vote count object and returns an article object wtih vote count updated", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: 5 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(5);
        });
    });
  });
  describe("/articles/:article_id/comments", () => {
    it("POST /:article_id/comments returns 201 and returns the posted comment", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({
          username: "icellusedkars",
          body: "Wow, what a fab article - genius!!!"
        })
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).to.contain.keys(
            "comment_id",
            "author",
            "votes",
            "created_at",
            "body"
          );
          expect(comment.body).to.equal("Wow, what a fab article - genius!!!");
        });
    });
    it("GET /:article_id/comments returns 200 and returns an array of comments for the given article id, sorted by created_at descending as default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments[0]).to.contain.keys(
            "comment_id",
            "author",
            "votes",
            "created_at",
            "body"
          );
          expect(body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET /:article_id/comments?sort_by returns 200 and sorts the results by requested column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("comment_id", {
            descending: true
          });
        });
    });
    it("GET /:article_id/comments?order returns 200 and sorts the results in requested order", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("created_at", {
            ascending: true
          });
        });
    });
    it("GET /:article_id/comments?sort_by&order returns 200 and returns the results in requested order and sorted by requested column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=author&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.sortedBy("author", { ascending: true });
        });
    });
  });
  describe("/articles", () => {
    it("GET /  returns 200 and an array of article objects with a comment count - default sort order created_at in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
          expect(body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("GET /articles?sort_by returns 200 and an array of article objects sorted by requested column in default order", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("article_id", {
            descending: true
          });
        });
    });
    it("GET /articles?order=asc returns 200 and an array of article objects sorted in ascending order - by default column", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.sortedBy("created_at", {
            ascending: true
          });
        });
    });
    it("GET /articles?author returns 200 and an array of article objects filtered by requested author", () => {
      return request(app)
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article.author).to.equal("rogersop");
          });
        });
    });
    it("GET /articles?topic returns 200 and an array of article objects filtered by requested topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach(article => {
            expect(article.topic).to.equal("cats");
          });
        });
    });
  });
  describe("/comments/:comment_id", () => {
    it("PATCH /:comment_id returns 202 and accepts a vote count object and returns an comment object with vote count updated", () => {
      return request(app)
        .patch("/api/comments/13")
        .send({ inc_votes: 3 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(3);
        });
    });
    it("DELETE /:comment_id returns 204", () => {
      return request(app)
        .delete("/api/comments/13")
        .expect(204);
    });
  });
  describe("/api", () => {
    it("GET / returns a json object with all the endpoints", () => {
      return request(app)
        .get("/api")
        .then(response => {
          expect(response.body).to.contain.keys("GET /api");
        });
    });
  });
  describe("error handling", () => {
    it("GET /incorrect_route returns 404 'Route not found!' when passed an incorrect route", () => {
      return request(app)
        .get("/api/fish")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Route not found!");
        });
    });
    it("PUT/ api/articles returns 405 'Method not allowed' when an incorrect method is used", () => {
      return request(app)
        .put("/api/articles")
        .expect(405)
        .then(response => {
          expect(response.body.msg).to.equal("Method not allowed");
        });
    });
    it("GET /articles/9999 returns 404 'No article found for article_id: 9999!! when passed an incorrect article_id", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "No article found for article_id: 9999!"
          );
        });
    });
    it("GET /articles/abc returns 400 'Bad Request' when passed an incorrect format", () => {
      return request(app)
        .get("/api/articles/abc")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad Request");
        });
    });
    it("PATCH /articles/9999 returns 404 'No article found for article_id: 9999! when passed an incorrect article_id", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "No article found for article_id: 9999!"
          );
        });
    });
    it("PATCH /articles/abc returns 400 'Bad Request' when passed an incorrect format", () => {
      return request(app)
        .patch("/api/articles/abc")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad Request");
        });
    });
    it("PATCH /articles/:article_id if a inc_vote object is not passed, returns article without incrementing vote", () => {
      return request(app)
        .get("/api/articles/3")
        .then(({ body: { article } }) => {
          const votes = article.votes;
          return request(app)
            .patch("/api/articles/3")
            .send()
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article.votes).to.equal(votes);
            });
        });
    });
    it("GET /articles/:article_id/comments returns an empty object when no comments are found", () => {
      return request(app)
        .get("/api/articles/4/comments")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
        });
    });
    it("GET /articles/9999/comments returns 404 ' No article found for article_id: 9999! when article does not exist", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "No article found for article_id: 9999!"
          );
        });
    });
    it("GET /articles/abc/comments returns 400 'Bad Request when passed an incorrect format", () => {
      return request(app)
        .get("/api/articles/abc/comments")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad Request");
        });
    });
    it("POST /articles/9999/comments returns 404 'No article found for article_id when article does not exist", () => {
      return request(app)
        .post("/api/articles/9999/comments")
        .send({
          username: "icellusedkars",
          body: "Wow, what a fab article - genius!!!"
        })
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("No article found for article_id");
        });
    });
    it("POST /articles/:article_id/comments returns 400 'No comment to post' when there is no comment to post", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send()
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("No comment to post");
        });
    });
    it("POST /articles/:article_id/comments returns 400 'username does not exist", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "fred", body: "test" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Username does not exist");
        });
    });
    it("POST /articles/:article_id/comments returns 400 'Bad Request' if object contains the incorrect keys", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ author: "lurker", body: "test" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad Request");
        });
    });
    it("GET /users/:username returns 404 'User not found!' if username does not exist", () => {
      return request(app)
        .get("/api/users/fred123")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("User not found!");
        });
    });
    it("PATCH /comments/:comment_id if a inc_vote object is not passed, returns comment without incrementing vote", () => {
      return request(app)
        .get("/api/comments/2")
        .then(({ body: { comment } }) => {
          const votes = comment[0].votes;
          return request(app)
            .patch("/api/comments/2")
            .send()
            .expect(200)
            .then(({ body: { comment } }) => {
              expect(comment.votes).to.equal(votes);
            });
        });
    });
    it("PATCH /comments/9999 returns 404 'No comment found for comment_id: 9999!' when passed an incorrect comment_id", () => {
      return request(app)
        .patch("/api/comments/9999")
        .send({ inc_votes: 5 })
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "No comment found for comment_id: 9999!"
          );
        });
    });
    it("PATCH /comments/abc returns 400 'Bad Request' when passed an incorrect format", () => {
      return request(app)
        .patch("/api/comments/abc")
        .send({ inc_votes: 5 })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Bad Request");
        });
    });
    it("DELETE /comments/9999 returns 404 No comment found for comment_id: 9999' when passed an incorrect comment_id", () => {
      return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "No comment found for comment_id: 9999!"
          );
        });
    });
    it("GET /api/articles?sort_by returns 400 'Invalid query' when query is invalid", () => {
      return request(app)
        .get("/api/articles?sort_by=fred")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Invalid query");
        });
    });
    it("GET /api/articles?author=fred returns 404 'Author not found", () => {
      return request(app)
        .get("/api/articles?author=fred")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Author not found");
        });
    });
    it("GET api/articles?topic=fred returns 404 'Topic not found", () => {
      return request(app)
        .get("/api/articles?topic=fred")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Topic not found");
        });
    });
  });
});
