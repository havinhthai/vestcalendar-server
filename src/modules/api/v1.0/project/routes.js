const router = require('express').Router();

const apiMiddleware = require('../middleware');
const { handleValidate } = require('../middleware');
const { checkIdParam, checkQueryProject } = require('./validations');

const {
  getProjects,
  getProjectDetails,

  getWatchList,
  addProjectToWatchList,
  removeProjectFromWatchList,
} = require('./controllers');

router.get('/', checkQueryProject, handleValidate, getProjects);

router.get('/watch', apiMiddleware.checkAuth, getWatchList);

router.get('/:id', checkIdParam, handleValidate, getProjectDetails);

router.use(apiMiddleware.checkAuth);

router.route('/:id/watch')
  .post(checkIdParam, handleValidate, addProjectToWatchList)
  .delete(checkIdParam, handleValidate, removeProjectFromWatchList);

module.exports = router;
