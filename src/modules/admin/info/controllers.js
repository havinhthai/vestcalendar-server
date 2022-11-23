const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const { Info } = require('../../../models');

module.exports = {
  editPage: async (req, res, next) => {
    try {
      let info = await Info.findOne().lean();

      if (!info) {
        info = await Info.create({
          name: 'Vesting Calendar',
          description: '',
          copyright: '© 2022 - Vesting Calendar',
          facebookAppId: '',
          facebookPageId: '',
          googleId: '',
        });
      }

      res.render('admin/body/info/index', { info });
    } catch (error) {
      next(error);
    }
  },
  onEdit: async (req, res, next) => {
    try {
      const { id } = req.body;

      if (!ObjectId.isValid(id)) return next();

      await Info.findByIdAndUpdate(id, req.body);

      req.flash('success', 'Edit successfully!');
      res.redirect('back');
    } catch (error) {
      next(error);
    }
  },
};
