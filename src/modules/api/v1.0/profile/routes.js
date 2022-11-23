const router = require('express').Router();

const { getProfile, updateProfile } = require('./controllers');

router.route('/')
  .get(getProfile)
  .put(updateProfile);

module.exports = router;
