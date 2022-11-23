const express = require('express');

const router = express.Router();

const {
  profilePage,
  onUpdateInformation,
  onChangePassword,
  onLogout,
} = require('./controllers');
const { validateInput } = require('../middleware');
const { checkUpdateInformation, checkChangePassword } = require('./validations');

router.get('/logout', onLogout);

router.route('/')
  .get(profilePage)
  .put(checkUpdateInformation, validateInput, onUpdateInformation);

router.put('/change-password', checkChangePassword, validateInput, onChangePassword);

module.exports = router;
