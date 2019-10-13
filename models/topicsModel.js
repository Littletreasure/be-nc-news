const connection = require("../db/connection");

const fetchTopics = () => {
  return connection.select("*").from("topics");
};

const addTopic = topic => {
  return connection
    .insert([{ slug: topic.slug, description: topic.description }], ["*"])
    .into("topics")
    .then(topic => {
      return topic[0];
    });
};

module.exports = { fetchTopics, addTopic };
