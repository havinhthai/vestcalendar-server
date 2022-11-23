/* eslint-disable no-param-reassign */
const Utils = require('../utils');
const BotUser = require('../models/BotUser');

module.exports.checkBotActive = (context, next) => {
  if (!global.active) return;

  next();
};

module.exports.checkBotOwner = (context, next) => {
  const { from } = context.update.message;

  const { TELEGRAM_BOT_OWNER_ID } = process.env;

  if (+TELEGRAM_BOT_OWNER_ID !== from.id) return;

  next();
};

module.exports.checkRolePermission = allowRoles => async (context, next) => {
  let userRole;

  const { chat } = context.update.message;

  const privateChat = chat.type === 'private';

  if (privateChat) {
    userRole = await Utils.Bot.getPrivateUserRole(context);
  } else {
    userRole = await Utils.Bot.getGroupUserRole(context);
  }


  if (allowRoles.indexOf(userRole) === -1) return;

  next();
};

module.exports.SceneStep = {
  inputUsername: async (context) => {
    const validMessage = 'Nhập tên tài khoản (Ex: @user_name):';

    context.wizard.state.prevFieldRequired = true;
    context.wizard.state.prevFieldName = 'username';
    context.wizard.state.preFieldValidMessage = validMessage;

    context.reply(validMessage);

    return context.wizard.next();
  },
  inputGroupId: async (context) => {
    const {
      prevFieldName,
      prevFieldRequired,
      preFieldValidMessage,
    } = context.wizard.state;

    const { text } = context.update.message;

    if (prevFieldRequired && !text) {
      context.reply(preFieldValidMessage);
      return;
    }

    const validMessage = 'Nhập group link (Ex: https://t.me/123456789):';

    if (prevFieldName) {
      context.wizard.state[prevFieldName] = text;
    }

    context.wizard.state.prevFieldRequired = true;
    context.wizard.state.prevFieldName = 'group';
    context.wizard.state.preFieldValidMessage = validMessage;

    context.reply(validMessage);

    return context.wizard.next();
  },
  saveBotUser: async (context) => {
    const {
      // prevFieldName,
      prevFieldRequired,
      preFieldValidMessage,
    } = context.wizard.state;

    const { text } = context.update.message;

    if (prevFieldRequired && !text) {
      context.reply(preFieldValidMessage);
      return;
    }

    try {
      let { username } = context.wizard.state;

      if (username.startsWith('@')) {
        username = username.replace('@', '');
      }

      await BotUser.create({
        username,
        group: text,
      });

      context.reply('Thêm quản lý thành công!');
    } catch (error) {
      context.reply(`Failed to add user: ${error.message}`);
    }

    return context.scene.leave();
  },
  removeBotUser: async (context) => {
    const {
      // prevFieldName,
      prevFieldRequired,
      preFieldValidMessage,
    } = context.wizard.state;

    const { text } = context.update.message;

    if (prevFieldRequired && !text) {
      context.reply(preFieldValidMessage);
      return;
    }

    try {
      let { username } = context.wizard.state;

      if (username.startsWith('@')) {
        username = username.replace('@', '');
      }

      await BotUser.deleteOne({
        username,
        group: text,
      });

      context.reply('Xóa quản lý thành công!');
    } catch (error) {
      context.reply(`Failed to remove user: ${error.message}`);
    }

    return context.scene.leave();
  },
};
