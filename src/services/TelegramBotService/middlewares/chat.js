const { ChatType } = require('../constants');

module.exports.checkPrivateChat = (context, next) => {
  const { chat } = context.update.message;

  if (chat.type !== ChatType.Private) return;

  next();
};

module.exports.checkGroupChat = (context, next) => {
  const { chat } = context.update.message;

  if ([ChatType.Group, ChatType.SuperGroup].indexOf(chat.type) === -1) return;

  next();
};
