process.env.NODE_ENV = "test";
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

describe("/api/categories", () => {
  test("", () => {});
});
