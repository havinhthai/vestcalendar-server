const mongoose = require('mongoose');

const { User } = require('../../../models');
const { countPerPage, fuzzySearch } = require('../../../helpers');

const { ObjectId } = mongoose.Types;

const perPage = 25;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const { sort, q, page } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = {};
      const conditionSort = {};

      switch (+sort) {
        case 2:
          conditionSort.createdAt = -1;
          break;
        default:
          conditionSort.createdAt = 1;
      }

      if (q) {
        const search = fuzzySearch(q);

        conditionFind.$or = [
          { name: search },
          { email: search },
        ];
      }

      const getUsers = User
        .find(conditionFind)
        .sort(conditionSort)
        .skip(perPage * (currentPage - 1))
        .limit(perPage)
        .select('name email createdAt')
        .lean();

      const getTotalUsers = User.countDocuments(conditionFind);

      const [users, totalUsers] = await Promise.all([getUsers, getTotalUsers]);

      res.render('admin/body/user/index', {
        users,
        query: req.query,
        currentPage,
        totalUsers,
        totalPage: Math.ceil(totalUsers / perPage),
        countPerPage,
      });
    } catch (error) {
      next(error);
    }
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();

      const user = await User
        .findById(id)
        .select('-resetPasswordToken -resetPasswordExpires')
        .lean();

      if (!user) return next();

      res.render('admin/body/user/edit', { user });
    } catch (error) {
      next(error);
    }
  },
  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();


      const user = await User
        .findByIdAndUpdate(id, {});

      if (!user) return next();

      req.flash('success', 'Edit account successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
