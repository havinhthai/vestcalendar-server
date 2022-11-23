const express = require('express');

const router = express.Router();

const {
  indexPage,
  editPage,
  ckeImagePage,
  uploadFile,
  onEdit,
  onDelete,
  fetchBrowserImages,
} = require('./controllers');

router.get('/api/images', fetchBrowserImages);

router.get('/browser/images', ckeImagePage);

router.route('/:id')
  .get(editPage)
  .put(onEdit)
  .delete(onDelete);

router.route('/')
  .get(indexPage)
  .post(uploadFile);

module.exports = router;
