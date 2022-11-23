const { check } = require('express-validator');

module.exports = {
  checkLogin: [
    check('email')
      .not().isEmpty().withMessage('Username is required')
      .isEmail()
      .withMessage('Username invalid!'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],

  checkEmail: [
    check('email')
      .not().isEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('Email invalid!'),
  ],

  checkChangePassword: [
    check('newPassword').not().isEmpty().withMessage('New password is required'),
    check('confirmPassword', 'Password is not match').custom((value, { req }) => (req.body.newPassword === value)),
  ],
};
