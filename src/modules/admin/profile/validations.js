const { check } = require('express-validator');

module.exports = {
  checkUpdateInformation: [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
  ],

  checkChangePassword: [
    check('currentPassword').not().isEmpty().withMessage('Password is required'),
    check('newPassword').not().isEmpty().withMessage('New password is required'),
    check('confirmPassword', 'Password is not match').custom((value, { req }) => (req.body.newPassword === value)),
  ],
};
