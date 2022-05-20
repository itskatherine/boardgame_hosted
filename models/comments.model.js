const db = require("../db/connection");

const removeComment = (id) => {
  const queryStr = `
    DELETE FROM comments
    WHERE comment_id = $1 RETURNING *;`;
  return db.query(queryStr, [id]).then((response) => {
    const deleted = response.rows[0];
    if (!deleted) {
      return Promise.reject({
        status: 404,
        msg: "No comment exists with that ID.",
      });
    }
  });
};

module.exports = { removeComment };
