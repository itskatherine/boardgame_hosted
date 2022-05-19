const db = require("../db/connection");

const fetchReviewById = (id) => {
  const queryStr = `SELECT reviews.*, COUNT(comments.*)::INT AS comment_count 
  FROM reviews 
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = $1
  GROUP BY reviews.review_id
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
  if (typeof newVote != "number") {
    return Promise.reject({
      status: 400,
      msg: "Invalid data type.",
    });
  }
  const queryVals = [id, newVote];

  const updateVoteQueryStr = `
      UPDATE reviews
      SET
      votes = votes + $2
      WHERE review_id = $1
      RETURNING *;
      `;

  return db.query(updateVoteQueryStr, queryVals).then((updatedReviewObj) => {
    const updatedReview = updatedReviewObj.rows[0];

    if (!updatedReview) {
      return Promise.reject({
        status: 404,
        msg: "No review exists with that ID.",
      });
    }
    return updatedReview;
  });
};

const fetchReviews = () => {
  const queryStr = `SELECT reviews.*, COUNT(comments.*)::INT AS comment_count 
    FROM reviews 
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY created_at DESC
    `;
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};

const fetchReviewCommentsFromId = (id) => {
  const queryStr = `SELECT * FROM comments
  WHERE review_id = $1`;
  const returnReviewIfExists = fetchReviewById(id);
  const returnCommentsIfExist = db.query(queryStr, [id]).then((response) => {
    const comments = response.rows;
    return comments;
  });

  const promises = [returnReviewIfExists, returnCommentsIfExist];

  return Promise.all(promises).then(([review, comments]) => {
    return comments;
  });
};

const updateCommentToReviewFromId = (id, reqBody) => {
  const { body, username } = reqBody;
  if (!body || !username) {
    return Promise.reject({
      status: 400,
      msg: "Bad request.",
    });
  }

  const commentQueryStr = `
  INSERT INTO comments
  (body, review_id, author)
  VALUES
  ($1, $2, $3)
  RETURNING *;`;

  const reviewExists = fetchReviewById(id).then((review) => review);
  const userExists = db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);

  const promises = [reviewExists, userExists];
  return Promise.all(promises).then(([reviews, user]) => {
    if (!user.rows[0]) {
      return Promise.reject({
        status: 404,
        msg: "No user exists with that username.",
      });
    }
    return db.query(commentQueryStr, [body, id, username]).then((response) => {
      return response.rows[0];
    });
  });
};

module.exports = {
  fetchReviewById,
  updateReviewById,
  fetchReviews,
  fetchReviewCommentsFromId,
  updateCommentToReviewFromId,
};
