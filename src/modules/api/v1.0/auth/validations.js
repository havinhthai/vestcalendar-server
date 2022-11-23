const { body } = require('express-validator');

module.exports = {
  checkLoginWithFacebook: [
    body('fbToken').not().isEmpty().withMessage('Facebook Token is required'),
    body('deviceToken').not().isEmpty().withMessage('Device Token is required'),
    body('deviceType').not().isEmpty().withMessage('Device Type is required'),
  ],

  checkLoginWithApple: [
    body('appleId').not().isEmpty().withMessage('Apple Id is required'),
    body('deviceToken').not().isEmpty().withMessage('Device Token is required'),
    body('deviceType').not().isEmpty().withMessage('Device Type is required'),
  ],

  checkConnectFb: [
    body('appleId').not().isEmpty().withMessage('Apple Id is required'),
    body('fbToken').not().isEmpty().withMessage('Facebook Token is required'),
    body('deviceToken').not().isEmpty().withMessage('Device Token is required'),
    body('deviceType').not().isEmpty().withMessage('Device Type is required'),
  ],

  checkLoginGoogle: [
    body('accessToken')
      .not()
      .isEmpty()
      .withMessage('Access token is required')
      .isString()
      .withMessage('Access token invalid'),
  ],

  checkLoginTelegram: [
    body('id')
      .not()
      .isEmpty()
      .withMessage('ID is required')
      .isNumeric()
      .withMessage('ID invalid'),
    body('hash')
      .not()
      .isEmpty()
      .withMessage('hash is required')
      .isString()
      .withMessage('hash invalid'),
  ],
};
