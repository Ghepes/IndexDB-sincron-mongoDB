const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/trace-list.html'));
});

router.get('/add-trace', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-trace.html'));
});

router.get('/trace', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/trace.html'));
});

module.exports = router;
