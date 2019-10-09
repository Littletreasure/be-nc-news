process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
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
          expect(body.topics[0]).to.have.keys("slug", "description");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET /:username returns 200 and a user object", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an("array");
          expect(body.user[0]).to.be.an("object");
          expect(body.user[0]).to.have.keys("username", "avatar_url", "name");
        });
    });
  });
  describe("/articles/:article_id", () => {
    it("GET /:article_id returns 200 and an article object", () => {
      return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an("object");
          expect(body.article).to.have.keys(
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
    it("PATCH /:article_id returns 202 and accepts a vote count object and returns an article object wtih vote count updated", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: 5 })
        .expect(202)
        .then(({ body: { article } }) => {
          expect(article.article.votes).to.equal(5);
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
    it("GET /:article_id/comments returns 200 and returns an array of comments for the given article id", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
        });
    });
  });
});
