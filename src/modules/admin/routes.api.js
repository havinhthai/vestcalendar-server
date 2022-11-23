const express = require('express');

const router = express.Router();

const middleware = require('./middleware');

router.use(middleware.catch404Api);
router.use(middleware.catch500Api);

module.exports = router;
