process.env.NODE_ENV = "test";
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const res = require("express/lib/response");

afterAll(() => db.end());

beforeEach(() => seed(testData));

describe("/api/categories", () => {
  test("200: Returns a list of category objects (with properties slug and description) when get request", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const categoriesArr = response.body.categories;
        expect(categoriesArr.length).toBe(4);
        categoriesArr.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: returns 404 error when a bad request made", () => {
    return request(app).get("/api/cadtegoriess").expect(404);
  });
});
