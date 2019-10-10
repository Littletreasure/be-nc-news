const handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

const handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02", "23503"];
  if (psqlBadRequestCodes.includes(err.code))
    res.status(400).send({ msg: "Bad Request" });
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
