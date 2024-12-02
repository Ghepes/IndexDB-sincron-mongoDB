const router = require('express').Router();

const {
    getAllTrace,
    getTraceById,
    createTrace,
    updateTrace,
    deleteTrace
  } = require('../../controllers/trace-controller');

// Set up GET all and POST at /api/traces
router
  .route('/')
  .get(getAllTrace)
  .post(createTrace);

// Set up GET one, PUT, and DELETE at /api/traces/:id
router
  .route('/:id')
  .get(getTraceById)
  .put(updateTrace)
  .delete(deleteTrace);

module.exports = router;
