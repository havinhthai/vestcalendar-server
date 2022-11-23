const { crawlerAll } = require('../../../services/crawler');

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      res.render('admin/body/homepage/index', {
        totalUsers: 0, totalShops: 0, totalProducts: 0, totalHolidays: 0,
      });
    } catch (error) {
      next(error);
    }
  },

  crawler: async (req, res, next) => {
    try {
      await crawlerAll();
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  },
};
