const bcrypt = require('bcryptjs');

const { Administrator } = require('../../../models');

module.exports = {
  profilePage: async (req, res, next) => {
    try {
      const administrator = await Administrator
        .findById(req.session.admin.id)
        .select('firstName lastName email avatar role')
        .populate('role', '-_id name')
        .lean();

      res.render('admin/body/profile/index', { administrator });
    } catch (error) {
      next(error);
    }
  },
  onUpdateInformation: async (req, res, next) => {
    try {
      await Administrator.findByIdAndUpdate(req.session.admin.id, req.body);

      req.flash('success', 'Updated information successfully');
      res.redirect('/admin/profile');
    } catch (error) {
      next(error);
    }
  },

  onChangePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const administrator = await Administrator.findById(req.session.admin.id);

      if (!bcrypt.compareSync(currentPassword, administrator.password)) {
        req.flash('danger', 'Password is incorrect');
        return res.redirect('/admin/profile');
      }

      administrator.password = newPassword;

      await administrator.save();

      req.flash('success', 'Changed password successfully');
      res.redirect('/admin/profile');
    } catch (error) {
      next(error);
    }
  },

  onLogout: async (req, res, next) => {
    try {
      await req.session.destroy();

      res.redirect('/admin/auth/login');
    } catch (error) {
      next(error);
    }
  },
};
