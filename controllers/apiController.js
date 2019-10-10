const path = require("path");

const getJson = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "endpoints.json"));
};

module.exports = { getJson };
