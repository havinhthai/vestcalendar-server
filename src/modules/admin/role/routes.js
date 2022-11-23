const express = require('express');

const router = express.Router();

const {
  indexPage,
  addPage,
  editPage,
  onAdd,
  onEdit,
  onDeleteAndRestore,
} = require('./controllers');
const { validateInput } = require('../middleware');
const { checkRole } = require('./validations');

router.route('/add')
  .get(addPage)
  .post(checkRole, validateInput, onAdd);

router.route('/:id')
  .get(editPage)
  .put(checkRole, validateInput, onEdit)
  .delete(onDeleteAndRestore);

router.get('/', indexPage);

module.exports = router;
