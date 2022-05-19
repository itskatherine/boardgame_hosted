const handleNotAnEndpoint = (req, res) => {
  res.status(404).send({ msg: "Invalid url" });
};

const handlePSQLError = (err, req, res, next) => {
  if (err.code == "22P02") {
    res.status(400).send({ msg: "Invalid data type." });
  } else if (err.code == "42703") {
    res.status(400).send({ msg: "Invalid data type." });
  } else {
    next(err);
  }
};

const handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleInternalServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = {
  handleNotAnEndpoint,
  handlePSQLError,
  handleCustomError,
  handleInternalServerError,
};
