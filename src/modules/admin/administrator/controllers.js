const mongoose = require('mongoose');

const { Administrator, Role } = require('../../../models');
const { countPerPage, fuzzySearch } = require('../../../helpers');

const { ObjectId } = mongoose.Types;

const perPage = 25;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const {
        sort, q, role, page,
      } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = {};
      const conditionSort = {};

      switch (+sort) {
        case 2:
          conditionSort.createdAt = 1;
          break;
        case 3:
          conditionSort.isBlocked = -1;
          conditionSort.createdAt = -1;
          break;
        case 4:
          conditionSort.isBlocked = 1;
          conditionSort.createdAt = -1;
          break;
        default:
          conditionSort.createdAt = -1;
      }

      if (q) {
        const search = fuzzySearch(q);

        conditionFind.$or = [
          { firstName: search },
          { lastName: search },
          { email: search },
        ];
      }

      if (role) {
        conditionFind.role = ObjectId(role);
      }

      const getAdministrators = Administrator
        .aggregate()
        .match(conditionFind)
        .sort(conditionSort)
        .skip(perPage * (currentPage - 1))
        .limit(perPage)
        .lookup({
          from: 'roles', localField: 'role', foreignField: '_id', as: 'role',
        })
        .unwind('$role')
        .match({ 'role.isRoot': false })
        .project({
          firstName: 1,
          lastName: 1,
          email: 1,
          role: {
            _id: 1,
            name: 1,
          },
          isBlocked: 1,
          createdAt: 1,
        });

      const getTotalAdministrators = Administrator.countDocuments(conditionFind);

      const [administrators, totalAdministrators] = await Promise.all([
        getAdministrators, getTotalAdministrators]);

      res.render('admin/body/administrator/index', {
        administrators,
        query: req.query,
        currentPage,
        totalAdministrators,
        totalPage: Math.ceil(totalAdministrators / perPage),
        countPerPage,
      });
    } catch (error) {
      next(error);
    }
  },

  addPage: async (req, res, next) => {
    try {
      const roles = await Role
        .find({
          deletedAt: { $exists: false },
          isRoot: false,
        })
        .select('name')
        .sort({ name: 1 })
        .lean();

      res.render('admin/body/administrator/add', { roles });
    } catch (error) {
      next(error);
    }
  },
  onAdd: async (req, res, next) => {
    try {
      const role = await Role
        .findById(req.body.role)
        .select('isRoot')
        .lean();

      if (role && role.isRoot) {
        req.flash('danger', "You can't set root role for account!");
        return res.redirect('back');
      }

      const { email } = req.body;

      const existsEmail = await Administrator.countDocuments({ email });

      if (existsEmail) {
        req.flash('danger', `Email ${email} is exists!`);
        return res.redirect('back');
      }

      const administrator = new Administrator(req.body);

      await administrator.save();

      req.flash('success', 'Add account successfully!');
      res.redirect('/admin/administrators');
    } catch (error) {
      next(error);
    }
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();

      if (id === req.session.admin.id) {
        req.flash('danger', "You can't edit your account!");
        return res.redirect('/admin/administrators');
      }

      const administrator = await Administrator
        .findById(id)
        .select('-resetPasswordToken -resetPasswordExpires -password')
        .populate('role', 'isRoot')
        .lean();

      if (!administrator) return next();

      if (administrator.role.isRoot) {
        req.flash('danger', "You can't edit root account!");
        return res.redirect('/admin/administrators');
      }

      const roles = await Role
        .find({
          deletedAt: { $exists: false },
          isRoot: false,
        })
        .select('name')
        .sort({ name: 1 })
        .lean();

      res.render('admin/body/administrator/edit', { administrator, roles });
    } catch (error) {
      next(error);
    }
  },
  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();

      if (id === req.session.admin.id) {
        req.flash('danger', "You can't edit your account!");
        return res.redirect('back');
      }

      const { isBlocked, role: roleId } = req.body;

      const administrator = await Administrator
        .findById(id)
        .select('role')
        .populate('role', 'isRoot');

      if (!administrator) return next();

      if (administrator.role.isRoot) {
        req.flash('danger', "You can't edit root account!");
        return res.redirect('back');
      }

      const role = await Role
        .findById(roleId)
        .select('isRoot')
        .lean();

      if (role && role.isRoot) {
        req.flash('danger', "You can't set root role for account!");
        return res.redirect('back');
      }

      administrator.isBlocked = !!isBlocked;
      administrator.role = roleId;

      await administrator.save();

      req.flash('success', 'Edit account successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
