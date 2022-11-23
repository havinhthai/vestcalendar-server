const { check } = require('express-validator');

module.exports = {
  checkCategory: [
    check('name').not().isEmpty().withMessage('Name is required'),
  ],
};
