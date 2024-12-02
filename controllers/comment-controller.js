const { Comment, Trace } = require('../models');

const commentController = {
  // add comment to trace
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        return Trace.findOneAndUpdate(
          { _id: params.traceId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbTraceData => {
        if (!dbTraceData) {
          res.status(404).json({ message: 'No trace found with this id!' });
          return;
        }
        res.json(dbTraceData);
      })
      .catch(err => res.json(err));
  },

  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbTraceData => {
        if (!dbTraceData) {
          res.status(404).json({ message: 'No trace found with this id!' });
          return;
        }
        res.json(dbTraceData);
      })
      .catch(err => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbTraceData => res.json(dbTraceData))
      .catch(err => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Trace.findOneAndUpdate(
          { _id: params.traceId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbTraceData => {
        if (!dbTraceData) {
          res.status(404).json({ message: 'No trace found with this id!' });
          return;
        }
        res.json(dbTraceData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = commentController;
