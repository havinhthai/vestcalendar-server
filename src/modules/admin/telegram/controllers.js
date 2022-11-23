const { User } = require('../../../models');
const TelegramBotService = require('../../../services/TelegramBotService');

module.exports = {
  indexPage: async (req, res, next) => {
    try {
      const users = await User
        .find({ telegramId: { $exists: true, $ne: null } })
        .select('name telegramId')
        .lean();

      res.render('admin/body/telegram/index', { users });
    } catch (error) {
      next(error);
    }
  },
  sendMessage: async (req, res, next) => {
    try {
      const { body } = req;

      const bot = TelegramBotService.getTelegrafInstance();

      let users = [];

      if (body['telegram-send-all']) {
        users = await User
          .find({ telegramId: { $exists: true, $ne: null } })
          .select('telegramId')
          .lean();
      } else if (body.users instanceof Array) {
        users = body.users.map(u => ({ telegramId: u }));
      } else {
        users = [{ telegramId: body.users }];
      }

      users.forEach((u) => {
        bot.telegram.sendMessage(u.telegramId, body.message);
      });

      req.flash('success', 'Send message successfully!');

      res.redirect('/admin/telegram');
    } catch (error) {
      next(error);
    }
  },
};
