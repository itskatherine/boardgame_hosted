const express = require("express");
const { getCategories } = require("./controllers/app.controller");

const app = express();

app.get("/api/categories", getCategories);

app.use((err, req, res, next) => {
  console.log("THis happens");
  res.status(err.status).send({ msg: err.msg });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
