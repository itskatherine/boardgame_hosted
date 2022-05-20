const fs = require("fs/promises");

const fetchAPI = () => {
  return fs.readFile("endpoints.json", "utf-8").then((endpoints) => {
    return JSON.parse(endpoints);
  });
};

module.exports = { fetchAPI };
