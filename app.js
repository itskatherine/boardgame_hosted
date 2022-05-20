const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewById,
  patchReviewById,
  getReviews,
  getReviewCommentsFromId,
  postCommentToReviewFromId,
} = require("./controllers/reviews.controller");
const {
  handleNotAnEndpoint,
  handlePSQLError,
  handleCustomError,
  handleInternalServerError,
} = require("./controllers/error.controller");
const { getUsers } = require("./controllers/users.controller");
const { deleteComment } = require("./controllers/comments.controller");
const { getAPI } = require("./controllers/api.controller");

const app = express();
app.use(express.json());

app.get("/api", getAPI);
app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);
app.patch("/api/reviews/:review_id", patchReviewById);
app.get("/api/reviews/:review_id/comments", getReviewCommentsFromId);
app.post("/api/reviews/:review_id/comments", postCommentToReviewFromId);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", handleNotAnEndpoint);

app.use(handlePSQLError);

app.use(handleCustomError);

app.use(handleInternalServerError);

module.exports = app;
