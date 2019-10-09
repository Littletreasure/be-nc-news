const express = require("express");
const apiRouter = require("./routes/apiRouter");
const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
