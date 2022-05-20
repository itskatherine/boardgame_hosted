const { removeComment } = require("../models/comments.model");

const deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = { deleteComment };
