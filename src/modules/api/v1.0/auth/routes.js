const express = require('express');

const router = express.Router();

const { handleValidate } = require('../middleware');
const { catch404 } = require('../../middleware');

const {
  loginGoogle,
  loginTelegram,
  loginWithApple,
  loginWithTwitter,
  loginWithFacebook,
  twitterRequestAuthLink,
} = require('./controllers');

const {
  checkLoginWithFacebook, checkLoginWithApple, checkConnectFb, checkLoginGoogle, checkLoginTelegram,
} = require('./validations');

router.post('/login/apple', checkLoginWithApple, handleValidate, loginWithApple);

router.post('/login', checkLoginWithFacebook, handleValidate, loginWithFacebook);

router.post('/connect/fb', checkConnectFb, handleValidate, loginWithFacebook);

router.post('/login/google', checkLoginGoogle, handleValidate, loginGoogle);

router.post('/login/telegram', checkLoginTelegram, handleValidate, loginTelegram);

router.get('/login/twitter/request-auth-link', twitterRequestAuthLink);

router.post('/login/twitter', loginWithTwitter);

router.use(catch404);

module.exports = router;
