const notARoute = (req, res) => {
  res.status(404).send({ msg: "Invalid url" });
};

module.exports = { notARoute };
