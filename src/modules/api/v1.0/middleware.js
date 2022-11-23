const { validationResult } = require('express-validator');

const { User } = require('../../../models');
const { apiErrors } = require('../../../helpers');
const Jwt = require('../../../services/jwt');

module.exports = {
  checkAuth: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return next(apiErrors.requireAuthToken);
      }

      const { _id: userId } = await Jwt.verifyToken(token);

      const user = await User.findById(userId).lean();

      if (!user) {
        return next(apiErrors.userNotExists);
      }

      if (user.isBlocked) {
        return next(apiErrors.userIsBlocked);
      }

      // Required birthday
      // if (!user.birthday && req.url !== '/users/me/birthday') {
      //   return next(apiErrors.needUpdateBirthday);
      // }

      req.user = {
        id: user._id,
        facebookId: user.facebookId,
      };

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return next(apiErrors.invalidAuthToken);
      }

      if (error.name === 'TokenExpiredError') {
        return next(apiErrors.tokenExpired);
      }

      next(error);
    }
  },

  handleValidate: (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(400).json({
      ...apiErrors.badRequest,
      errors: errors.array(),
    });
  },
};
