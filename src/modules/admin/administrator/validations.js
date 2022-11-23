const { check } = require('express-validator');

module.exports = {
  checkAdministrator: [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('email')
      .not().isEmpty().withMessage('Email is required')
      .isEmail()
      .withMessage('Email invalid!'),
    check('password').not().isEmpty().withMessage('New password is required'),
    check('confirmPassword', 'Password is not match').custom((value, { req }) => (req.body.password === value)),
    check('role').not().isEmpty().withMessage('Role is required'),
  ],
};
