const { fetchCategories } = require("../models/app.model.js");

getCategories = (req, res) => {
  fetchCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

module.exports = { getCategories };
