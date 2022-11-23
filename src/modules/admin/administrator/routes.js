const express = require('express');

const router = express.Router();

const {
  indexPage,
  addPage,
  onAdd,
  editPage,
  onEdit,
} = require('./controllers');
const { validateInput } = require('../middleware');
const { checkAdministrator } = require('./validations');

router.route('/add')
  .get(addPage)
  .post(checkAdministrator, validateInput, onAdd);

router.route('/:id')
  .get(editPage)
  .put(onEdit);

router.get('/', indexPage);

module.exports = router;
