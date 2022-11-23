const express = require('express');

const router = express.Router();

const { editPage, onEdit } = require('./controllers');
const { validateInput } = require('../middleware');
const { checkInfo } = require('./validations');

router.route('/')
  .get(editPage)
  .put(checkInfo, validateInput, onEdit);

module.exports = router;
