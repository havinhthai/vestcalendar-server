const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const { Role } = require('../../../models');
const { countPerPage, fuzzySearch } = require('../../../helpers');
const { permissionGroups } = require('../../../helpers/permission');

const perPage = 20;

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const { q, page } = req.query;
      const currentPage = Math.ceil((!page || page <= 0) ? 1 : +page);
      const conditionFind = { isRoot: false };

      if (q) {
        conditionFind.name = fuzzySearch(q);
      }

      const getRoles = Role
        .aggregate()
        .match(conditionFind)
        .sort({ deletedAt: 1, createdAt: 1 })
        .skip(perPage * (currentPage - 1))
        .limit(perPage)
        .lookup({
          from: 'administrators', localField: '_id', foreignField: 'role', as: 'administrators',
        })
        .project({
          name: 1,
          description: 1,
          createdAt: 1,
          deletedAt: 1,
          totalAdministrators: { $size: '$administrators' },
        });

      const getTotalRoles = Role.countDocuments(conditionFind);

      const [roles, totalRoles] = await Promise.all([getRoles, getTotalRoles]);

      res.render('admin/body/role/index', {
        roles,
        query: req.query,
        currentPage,
        totalRoles,
        totalPage: Math.ceil(totalRoles / perPage),
        countPerPage,
      });
    } catch (error) {
      next(error);
    }
  },

  addPage: async (req, res, next) => {
    try {
      res.render('admin/body/role/add', { permissionGroups });
    } catch (error) {
      next(error);
    }
  },
  onAdd: async (req, res, next) => {
    try {
      const role = new Role({
        ...req.body,
        isRoot: false,
      });

      await role.save();

      req.flash('success', 'Add role successfully!');
      res.redirect('/admin/roles');
    } catch (error) {
      next(error);
    }
  },

  editPage: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) return next();

      let role = await Role
        .aggregate()
        .match({ _id: ObjectId(id) })
        .lookup({
          from: 'administrators', localField: '_id', foreignField: 'role', as: 'administrators',
        })
        .project({
          name: 1,
          description: 1,
          permissions: 1,
          isRoot: 1,
          createdAt: 1,
          deletedAt: 1,
          totalAdministrators: { $size: '$administrators' },
        });

      role = role[0] // eslint-disable-line

      if (!role) return next();

      if (role.isRoot) {
        req.flash('danger', "Can't edit root role!");
        return res.redirect('/admin/roles');
      }

      res.render('admin/body/role/edit', { role, permissionGroups });
    } catch (error) {
      next(error);
    }
  },
  onEdit: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, description, permissions } = req.body;

      const role = await Role.findById(id);

      if (!role) return next();

      if (role.isRoot) {
        req.flash('danger', "Can't edit root role!");
        return res.redirect('back');
      }

      role.name = name;
      role.description = description;
      role.permissions = permissions || [];
      role.isRoot = false;

      await role.save();

      req.flash('success', 'Edit successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },

  onDeleteAndRestore: async (req, res, next) => {
    try {
      const { id } = req.params;

      const role = await Role
        .findById(id)
        .select('_id isRoot deletedAt');

      if (role.isRoot) {
        req.flash('danger', "Can't delete root role!");
        return res.redirect('back');
      }

      let txtState = 'Delete';

      if (role.deletedAt) {
        role.deletedAt = undefined;
        txtState = 'Restore';
      } else {
        role.deletedAt = Date.now();
      }

      await role.save();

      res.json({
        message: `${txtState} successfully`,
        payload: role,
      });
    } catch (error) {
      next(error);
    }
  },
};
