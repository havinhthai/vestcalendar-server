const { check } = require('express-validator');

module.exports = {
  checkInfo: [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('copyright').not().isEmpty().withMessage('Slug is required'),
  ],
};
