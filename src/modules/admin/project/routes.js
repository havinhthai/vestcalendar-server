const express = require('express');

const router = express.Router();

const {
  indexPage,
  addPage,
  onAdd,
  editPage,
  onEdit,
  onDelete,
} = require('./controllers');
const { validateInput } = require('../middleware');
const { checkProject } = require('./validations');

router.route('/add')
  .get(addPage)
  .post(checkProject, validateInput, onAdd);

router.route('/:id')
  .get(editPage)
  .put(onEdit)
  .delete(onDelete);

router.get('/', indexPage);

module.exports = router;
