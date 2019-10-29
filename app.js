const express = require("express");
const apiRouter = require("./routes/apiRouter");
const { send404Error } = require("./errors/index");
const cors = require("cors");

const app = express();
app.use(cors());
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
