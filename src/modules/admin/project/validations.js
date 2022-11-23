const { check } = require('express-validator');

module.exports = {
  checkProject: [
    check('name').not().isEmpty().withMessage('Name is required'),
  ],
};
