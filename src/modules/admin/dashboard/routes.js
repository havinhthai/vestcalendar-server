const express = require('express');

const router = express.Router();

const { indexPage, crawler } = require('./controllers');

router.get('/', indexPage);

router.get('/crawler', crawler);

module.exports = router;
