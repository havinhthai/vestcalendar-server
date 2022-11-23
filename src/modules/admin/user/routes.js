const express = require('express');

const router = express.Router();

const {
  indexPage,
  editPage,
  onEdit,
} = require('./controllers');

router.route('/:id')
  .get(editPage)
  .put(onEdit);

router.get('/', indexPage);

module.exports = router;
