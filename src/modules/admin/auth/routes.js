const express = require('express');

const router = express.Router();

const {
  loginPage,
  forgotPasswordPage,
  passwordResetPage,
  onLogin,
  onSendPasswordReset,
  onChangePassword,
} = require('./controllers');
const { validateInput } = require('../middleware');
const { redirectLogin } = require('./middleware');
const { checkLogin, checkEmail, checkChangePassword } = require('./validations');

router.use(redirectLogin);

router.route('/login')
  .get(loginPage)
  .post(checkLogin, validateInput, onLogin);

router.route('/password-reset/:token')
  .get(passwordResetPage)
  .post(checkChangePassword, validateInput, onChangePassword);

router.route('/password-reset')
  .get(forgotPasswordPage)
  .post(checkEmail, validateInput, onSendPasswordReset);

module.exports = router;
