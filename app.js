const express = require("express");
const apiRouter = require("./routes/apiRouter");
const app = express();
app.use(express.json());

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors/index.js");

app.use("/api", apiRouter);
app.all("/*", (req, res, next) => res.status(404).send("Route not found!"));

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
