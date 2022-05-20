const { fetchAPI } = require("../models/api.model");

const getAPI = (req, res, next) => {
  fetchAPI()
    .then((api) => {
      res.status(200).send({ api });
    })
    .catch(next);
};

module.exports = { getAPI };
