const express = require("express");
const {
  getCategories,
  getReviewById,
} = require("./controllers/app.controller");
const { notARoute } = require("./controllers/error.controller");

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.all("*", notARoute);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
