const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { send404Error } = require("./errors/index");

const app = express();
app.use(express.json());
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/index.js");

app.use("/api", apiRouter);
app.all("/*", send404Error);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
