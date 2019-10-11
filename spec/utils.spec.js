process.env.NODE_ENV = "test";

const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("converts a unix timestamp in an object into a date", () => {
    const newDate = new Date(1542284514171);
    const array = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const expected = formatDates(array);
    expect(expected[0].created_at).to.be.an.instanceOf(Date);
    expect(expected[0].created_at).to.eql(newDate);
  });
  it("converts a unix timestamp in more than one object into a date", () => {
    const array = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      }
    ];
    const expected = formatDates(array);
    expect(expected[0].created_at).to.be.an.instanceOf(Date);
    expect(expected[1].created_at).to.be.an.instanceOf(Date);
  });
  it("does not mutate the original list", () => {
    const array = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      }
    ];
    const expected = formatDates(array);
    expect(expected).to.not.equal(array);
  });
});

describe("makeRefObj", () => {
  it("creates a new object with key value pairs 'Moustache': 12 when passed an array containing an object", () => {
    const obj = [
      {
        article_id: 12,
        title: "Moustache",
        body: "Have you seen the size of that thing?",
        votes: 0,
        topic: "mitch",
        author: "butter_bridge"
        // created_at: 1974 - 11 - 26T12: 21: 54.171Z
      }
    ];
    const actual = makeRefObj(obj);
    expect(actual).to.eql({ Moustache: 12 });
  });
  it("creates a new object with key value pairs when passed an array containing more than one object", () => {
    const obj = [
      {
        article_id: 10,
        title: "Seven inspirational thought leaders from Manchester UK",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        votes: 0,
        topic: "mitch",
        author: "rogersop"
        // created_at: 1982 - 11 - 24T12: 21: 54.171Z
      },
      {
        article_id: 11,
        title: "Am I a cat?",
        body:
          "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
        votes: 0,
        topic: "mitch",
        author: "icellusedkars"
        // created_at: 1978 - 11 - 25T12: 21: 54.171Z
      },
      {
        article_id: 12,
        title: "Moustache",
        body: "Have you seen the size of that thing?",
        votes: 0,
        topic: "mitch",
        author: "butter_bridge"
        // created_at: 1974 - 11 - 26T12: 21: 54.171Z
      }
    ];
    const actual = makeRefObj(obj);
    expect(actual).to.eql({
      "Seven inspirational thought leaders from Manchester UK": 10,
      "Am I a cat?": 11,
      Moustache: 12
    });
  });
});

describe("formatComments", (obj, refObj) => {
  it("should change the created_by key to author", () => {
    const obj = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const refObj = { A: 6 };
    const actual = formatComments(obj, refObj);
    expect(actual[0]).to.contain.keys("body", "author", "votes", "created_at");
  });
  it("should replace the belongs_to key value pair with article_id", () => {
    const obj = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const refObj = { A: 6 };
    const actual = formatComments(obj, refObj);
    expect(actual).to.eql([
      {
        body: "This is a bad article name",
        article_id: 6,
        author: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ]);
  });
  it("should not mutate the original array", () => {
    const obj = [
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      }
    ];
    const refObj = { A: 6 };
    const actual = formatComments(obj, refObj);
    expect(actual).to.not.equal(obj);
  });
});
