const db = require("../db/connection");

const fetchReviewById = (id) => {
  const queryStr = `
  SELECT * from reviews
  WHERE review_id = $1;
  `;

  return db.query(queryStr, [id]).then((reviewArr) => {
    const review = reviewArr.rows[0];
    if (!review) {
      return Promise.reject({
        status: 404,
        msg: "No review exists with that ID.",
      });
    }
    return review;
  });
};

const updateReviewById = (id, newVote) => {
  const originalVoteQueryStr = `SELECT votes FROM reviews
   WHERE review_id = $1`;

  return db
    .query(originalVoteQueryStr, [id])
    .then((response) => {
      const review = response.rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: "No review exists with that ID.",
        });
      }
      const originalVote = review.votes;
      return originalVote;
    })
    .then((originalVote) => {
      if (typeof newVote != "number") {
        return Promise.reject({
          status: 400,
          msg: "Invalid data type.",
        });
      }
      const updateVoteQueryStr = `
      UPDATE reviews
      SET
      votes = ${originalVote + newVote}
      WHERE review_id = ${id}
      RETURNING *;
      `;
      return db.query(updateVoteQueryStr).then((updatedReviewObj) => {
        const updatedReview = updatedReviewObj.rows[0];

        return updatedReview;
      });
    });
};

module.exports = { fetchReviewById, updateReviewById };
