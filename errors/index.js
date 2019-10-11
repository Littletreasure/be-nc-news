const handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

const handlePsqlErrors = (err, req, res, next) => {
  // console.log(err);
  const psqlBadRequestCodes1 = ["22P02", "23502"];
  const psqlBadRequestCodes2 = ["23503"];
  const psqlBadRequestCodes3 = ["42703"];
  if (psqlBadRequestCodes1.includes(err.code))
    res.status(400).send({ msg: "Bad Request" });
  else if (psqlBadRequestCodes2.includes(err.code))
    res.status(404).send({ msg: "No article found for article_id" });
  else if (psqlBadRequestCodes3.includes(err.code))
    res.status(400).send({ msg: "Invalid query" });
  else next(err);
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

const send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};
module.exports = {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  send405Error
};
