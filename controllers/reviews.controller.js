const {
  fetchReviewById,
  updateReviewById,
  fetchReviews,
} = require("../models/reviews.model.js");

const getReviewById = (req, res, next) => {
  const id = req.params.review_id;
  fetchReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

const patchReviewById = (req, res, next) => {
  const id = req.params.review_id;
  const newVote = req.body.inc_votes || 0;
  updateReviewById(id, newVote)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};

const getReviews = (req, res, next) => {
  fetchReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};

module.exports = { getReviewById, patchReviewById, getReviews };
