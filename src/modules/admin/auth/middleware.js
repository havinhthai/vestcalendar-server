module.exports = {
  redirectLogin: (req, res, next) => {
    if (req.session && req.session.admin) {
      res.redirect('/');
      return next();
    }

    next();
  },
};
