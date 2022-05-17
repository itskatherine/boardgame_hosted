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
      const originalVote = response.rows[0].votes;
      return originalVote;
    })
    .then((originalVote) => {
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
