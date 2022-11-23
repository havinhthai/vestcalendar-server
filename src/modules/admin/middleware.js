const { checkValidateErrors, checkPermission } = require('../../helpers');
const { Administrator } = require('../../models');

module.exports = {
  validateInput: (req, res, next) => {
    const haveErrors = checkValidateErrors(req);

    if (haveErrors) {
      return res.redirect('back');
    }

    next();
  },
  redirectNonLogin: async (req, res, next) => {
    if (!req.session.admin) {
      req.flash('danger', 'Please login to continue!');

      return res.redirect('/admin/auth/login');
    }
    next();
  },
  checkPermission: async (req, res, next) => {
    const currentAdmin = await Administrator.findById(req.session.admin.id)
      .select('firstName lastName avatar isBlocked role')
      .populate('role', 'isRoot permissions deletedAt')
      .lean();

    if (currentAdmin.isBlocked) {
      req.flash('danger', 'Account is blocked!');
      req.session.admin = null;

      return res.redirect('/admin/auth/login');
    }

    res.locals.currentAdmin = {
      firstName: currentAdmin.firstName,
      lastName: currentAdmin.lastName,
      avatar: currentAdmin.avatar,
    };

    if (currentAdmin.role.deletedAt) {
      currentAdmin.role.permissions = [];
    }

    const { isAllow, denyRoutes } = checkPermission(
      req._parsedOriginalUrl.pathname,
      req.method.toLowerCase(),
      currentAdmin.role.permissions,
    );

    res.locals.denyRoutes = currentAdmin.role.isRoot
      ? [] : denyRoutes;

    if (!isAllow && !currentAdmin.role.isRoot) {
      if (req.xhr) {
        return res.status(403).json("You don't have permission!");
      }
      // if (req.headers.referer) {
      //   req.flash('danger', "You don't have permission!");
      //   return res.redirect('back');
      // }
      return res.render('admin/body/error/403');
    }

    next();
  },

  catch404Admin: (req, res) => {
    if (req.xhr) {
      return res.status(404).json('Not Found');
    }
    res.status(404).render('admin/body/error/404');
  },
  catch500Admin: (err, req, res, next) => { // eslint-disable-line
    console.log(err);

    if (req.xhr) {
      return res.status(500).json({
        message: 'Failed',
        payload: err.toString(),
      });
    }

    res.status(500).render('admin/body/error/500');
  },

  catch404Api: (req, res) => {
    res.status(404).json('Not Found');
  },
  catch500Api: (err, req, res, next) => { // eslint-disable-line
    console.log(err);

    res.status(500).json({
      message: 'Failed',
      payload: err.toString(),
    });
  },
};
