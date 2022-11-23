const { param, query } = require('express-validator');

module.exports = {
  checkQueryProject: [
    query('page')
      .optional({ checkFalsy: false })
      .isInt({ min: 0 })
      .withMessage('Page invalid!'),
    query('limit')
      .optional({ checkFalsy: false })
      .isInt({ min: 1 })
      .withMessage('Limit invalid!'),
  ],

  checkIdParam: [
    param('id')
      .not()
      .isEmpty()
      .withMessage('ID is required!')
      .isMongoId()
      .withMessage('ID invalid!'),
  ],
};
