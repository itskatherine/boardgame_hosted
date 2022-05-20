const { query } = require("../db/connection");
const db = require("../db/connection");

const removeComment = (id) => {
  const queryStr = `
    DELETE FROM comments
    WHERE comment_id = $1;`;
  return db.query(queryStr, [id]);
};

module.exports = { removeComment };
