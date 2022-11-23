const Utils = require('../utils');

module.exports.checkGroupAdmin = async (context, next) => {
  try {
    const { from } = context.update.message;

    const admins = await context.getChatAdministrators();

    const currentAdmin = admins.find(x => x.user.id === from.id);

    if (currentAdmin) return next();
  } catch (error) {
    Utils.log(`Check admin error: ${error.message}`);
  }
};
