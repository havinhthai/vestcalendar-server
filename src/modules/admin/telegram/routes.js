const express = require('express');

const router = express.Router();

const { indexPage, sendMessage } = require('./controllers');

router.route('/')
  .get(indexPage)
  .post(sendMessage);

module.exports = router;
