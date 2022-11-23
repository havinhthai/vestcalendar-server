const { apiResponse } = require('../../../../helpers');
const { User } = require('../../../../models');

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const { id: userId } = req.user;

      const user = await User.findById(userId)
        .select('-password')
        .lean();

      res.json(apiResponse({
        payload: user,
      }));
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const { id: userId } = req.user;

      const { body } = req;

      const updateFields = {};

      if (body.generalNotification !== undefined) {
        updateFields.generalNotification = !!body.generalNotification;
      }

      if (body.watchListNotification !== undefined) {
        updateFields.watchListNotification = !!body.watchListNotification;
      }

      if (body.allListNotification !== undefined) {
        updateFields.allListNotification = !!body.allListNotification;
      }

      const options = { new: true, select: '-password' };

      const user = await User.findByIdAndUpdate(userId, updateFields, options);

      res.json(apiResponse({
        payload: user,
      }));
    } catch (error) {
      next(error);
    }
  },
};
