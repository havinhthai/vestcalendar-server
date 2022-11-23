const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const verify = promisify(jwt.verify);

module.exports = {
  verifyToken: token => verify(token, process.env.JWT_SECRET),

  generateUserToken: user => jwt.sign(
    {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      googleId: user.googleId,
      telegramId: user.telegramId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE },
  ),

  generatePurchaseToken: userProduct => jwt.sign(
    userProduct,
    process.env.JWT_SECRET,
  ),

  decodedToken: token => jwt.decode(token),
};
