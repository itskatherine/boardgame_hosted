const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");

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
  test("404: returns 404 error when given invalid endpoint", () => {
    return request(app)
      .get("/api/cadtegoriess")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid url");
      });
  });
});

describe("/api/reviews/:review_id", () => {
  test("200: Should return review when given valid id", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review).toMatchObject({
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        });
      });
  });
  test("404: if the id doesnt exist should return 404 and message: No review exists with that id", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("No review exists with that ID.");
      });
  });
  test("400: if the is not a number, return 400 and message: Invalid data type", () => {
    return request(app)
      .get("/api/reviews/katherine")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid data type.");
      });
  });
});

//check if the id is the right datatype (400)
