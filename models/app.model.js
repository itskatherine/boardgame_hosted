const db = require("../db/connection");

const fetchCategories = () => {
  const queryStr = `SELECT * FROM categories`;
  return db.query(queryStr).then((categories) => {
    return categories.rows;
  });
};

const fetchReviewById = (id) => {
  const queryStr = `
  SELECT * from reviews
  WHERE review_id = $1;
  `;
  console.log(id);
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

module.exports = { fetchCategories, fetchReviewById };
