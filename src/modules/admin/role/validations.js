const { check } = require('express-validator');

module.exports = {
  checkRole: [
    check('name').not().isEmpty().withMessage('Name is required'),
  ],
};
