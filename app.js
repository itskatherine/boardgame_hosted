const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewById,
  patchReviewById,
} = require("./controllers/reviews.controller");
const {
  handleNotAnEndpoint,
  handlePSQLError,
  handleCustomError,
  handleInternalServerError,
} = require("./controllers/error.controller");
const { getUsers } = require("./controllers/users.controller");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);

app.patch("/api/reviews/:review_id", patchReviewById);

app.get("/api/users", getUsers);

app.all("*", handleNotAnEndpoint);

app.use(handlePSQLError);

app.use(handleCustomError);

app.use(handleInternalServerError);

module.exports = app;
