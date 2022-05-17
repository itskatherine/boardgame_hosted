const { fetchReviewById } = require("../models/reviews.model.js");

const getReviewById = (req, res, next) => {
  const id = req.params.review_id;

  fetchReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

module.exports = { getReviewById };
