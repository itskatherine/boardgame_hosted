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

const updateReviewById = (id) => {
  console.log("model");
  return true;
};

module.exports = { fetchReviewById, updateReviewById };
