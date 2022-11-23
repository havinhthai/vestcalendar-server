const mongoose = require('mongoose');

const { User, Event, UserFriend } = require('../../../../models');
const {
  apiErrors, apiResponse, fuzzySearch, updateFbFriends,
} = require('../../../../helpers');

const { ObjectId } = mongoose.Types;

const perPage = 20;

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const { q, page } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);

      const friends = [];

      const userFriends = await UserFriend
        .find({
          user: req.user.id,
        })
        .select('friend')
        .lean();

      userFriends.forEach((userFriend) => {
        if (userFriend.friend) {
          friends.push(userFriend.friend);
        }
      });

      const conditionFind = {
        _id: { $nin: [...friends, req.user.id] },
        isBlocked: false,
      };

      if (q) {
        const search = fuzzySearch(q);

        conditionFind.$or = [
          { firstName: search },
          { lastName: search },
        ];
      }

      const users = await User
        .find(conditionFind)
        .select('firstName lastName avatar birthday')
        .sort({ firstName: 1, lastName: 1 })
        .skip(perPage * (currentPage - 1))
        .limit(perPage)
        .lean();

      res.json(apiResponse({ users }));
    } catch (error) {
      next(error);
    }
  },

  getUserFriends: async (req, res, next) => {
    try {
      const { q, page } = req.query;
      const { id: userId, facebookId: userFacebookId } = req.user;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);

      if (currentPage === 1) {
        try {
          await updateFbFriends({
            userId, userFacebookId,
          });
        } catch (error) {
          console.log('Get facebook friends error', error.toString());
        }
      }

      const condFindFriend = {};
      // const condFindFriend = { 'friend.isBlocked': false };

      if (q) {
        const search = fuzzySearch(q);

        condFindFriend.$or = [
          { 'friend.firstName': search },
          { 'friend.lastName': search },
        ];
      }

      const userFriends = await UserFriend
        .aggregate()
        .match({ user: ObjectId(userId) })
        .lookup({
          from: 'users', localField: 'friend', foreignField: '_id', as: 'friend',
        })
        .unwind('$friend')
        .match(condFindFriend)
        .sort({ 'friend.firstName': 1, 'friend.lastName': 1 })
        .skip(perPage * (currentPage - 1))
        .limit(perPage)
        .project({
          _id: 1,
          friend: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
            birthday: 1,
          },
        });

      res.json(apiResponse({ userFriends }));
    } catch (error) {
      next(error);
    }
  },
  addFriend: async (req, res, next) => {
    try {
      const { friend: friendId } = req.body;
      const { id: userId } = req.user;

      if (userId.toString() === friendId.toString()) {
        return next({
          ...apiErrors.badRequest,
          message: 'You can\'t add yourself to your friend list',
        });
      }

      const friend = await User
        .findOne({
          _id: friendId,
          isBlocked: false,
        })
        .select('firstName lastName avatar birthday')
        .lean();

      if (!friend) {
        return next(apiErrors.friendNotFound);
      }

      const isExistUserFriend = await UserFriend
        .countDocuments({
          user: userId,
          friend: friendId,
        });

      if (isExistUserFriend) {
        return next(apiErrors.friendExists);
      }

      const userFriend = await UserFriend.create({
        user: userId,
        friend: friendId,
      });

      await UserFriend.create({
        user: friendId,
        friend: userId,
      });

      res.json(apiResponse({
        userFriend: {
          _id: userFriend._id,
          friend,
        },
      }, 'Add friend successfully'));
    } catch (error) {
      next(error);
    }
  },
  deleteFriend: async (req, res, next) => {
    try {
      const { friend: friendId } = req.body;

      const isExistFriend = await User
        .countDocuments({
          _id: friendId,
          isBlocked: false,
        });

      if (!isExistFriend) {
        return next(apiErrors.friendNotFound);
      }

      const userFriend = await UserFriend
        .findOne({
          user: req.user.id,
          friend: friendId,
        });

      if (!userFriend) {
        return next(apiErrors.friendNotExists);
      }

      await Promise.all([
        userFriend.remove(),
        UserFriend.remove({
          user: friendId,
          friend: req.user.id,
        }),
      ]);

      res.json(apiResponse({}, 'Delete friend successfully'));
    } catch (error) {
      next(error);
    }
  },

  getUserInfo: async (req, res, next) => {
    try {
      const user = await User
        .findById(req.user.id)
        .select('firstName lastName birthday avatar isConnectFB')
        .lean();

      return res.json(apiResponse({ user }));
    } catch (error) {
      next(error);
    }
  },

  updateUserInfo: async (req, res, next) => {
    try {
      const { birthday } = req.body;
      const { id: userId } = req.user;

      const [year, month, day] = birthday.split('-');

      const birthdayFormat = { year, month, day };

      const user = await User
        .findByIdAndUpdate(userId, {
          birthday: birthdayFormat,
        })
        .select('firstName lastName avatar birthday')
        .lean();

      const event = await Event.findOne({
        type: 'BIRTHDAY',
        friend: userId,
      });

      if (!event) {
        await Event.create({
          type: 'BIRTHDAY',
          friend: userId,
          description: `Today is ${user.firstName} ${user.lastName}'s birthday, congratulations.`,
          image: user.avatar,
          date: { day, month },
        });
      } else {
        event.date = { day, month };
        await event.save();
      }

      res.json(apiResponse({ user: { ...user, birthday: birthdayFormat } }, 'Update birthday successfully'));
    } catch (error) {
      next(error);
    }
  },

  updateSizes: async (req, res, next) => {
    try {
      const sizes = req.body;

      await User.findByIdAndUpdate(req.user.id, { sizes });

      return res.json(apiResponse({ sizes }, 'Update sizes successfully'));
    } catch (error) {
      next(error);
    }
  },
};
