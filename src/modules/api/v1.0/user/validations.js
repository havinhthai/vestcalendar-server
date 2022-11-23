const { body } = require('express-validator');

module.exports = {
  checkLogin: [
    body('fbToken').not().isEmpty().withMessage('Facebook Token is required'),
    body('deviceToken').not().isEmpty().withMessage('Device Token is required'),
    body('deviceType').not().isEmpty().withMessage('Device Type is required'),
  ],

  checkUpdateInfo: [
    body('birthday').not().isEmpty().withMessage('Birthday is required'),
  ],

  checkSizes: [
    body('top').not().isEmpty().withMessage('Top is required'),
    body('pants').not().isEmpty().withMessage('Pants is required'),
    body('shoes').not().isEmpty().withMessage('Shoes is required'),
  ],

  checkFriend: [
    body('friend').not().isEmpty().withMessage('Friend is required')
      .isMongoId()
      .withMessage('Friend must be MongoId'),
  ],
};
