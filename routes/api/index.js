const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const traceRoutes = require('./trace-routes');


router.use('/comments', commentRoutes);
// add prefix of `/traces` to routes created in `trace-routes.js`
router.use('/traces', traceRoutes);

module.exports = router;
