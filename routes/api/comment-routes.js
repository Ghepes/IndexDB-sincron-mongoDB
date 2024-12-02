const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<traceId>
router.route('/:traceId').post(addComment);

// /api/comments/<traceId>/<commentId>
router
.route('/:traceId/:commentId')
.put(addReply)
.delete(removeComment);

router
.route('/:traceId/:commentId/:replyId')
.delete(removeReply);

module.exports = router;
