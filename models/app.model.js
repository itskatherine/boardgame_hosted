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
  return db.query(queryStr, [id]).then((review) => {
    return review.rows[0];
  });
};

module.exports = { fetchCategories, fetchReviewById };
