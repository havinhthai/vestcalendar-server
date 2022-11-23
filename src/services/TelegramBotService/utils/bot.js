const fs = require('fs/promises');

const Constants = require('../constants');
const BotUser = require('../models/BotUser');

module.exports.getBotConfig = async () => {
  let config = {};

  try {
    const fileContent = await fs.readFile(Constants.Bot.CONFIG_FILE_PATH, 'utf8');

    config = JSON.parse(fileContent);
  } catch (error) {
    console.log('getBotConfig > ', error);
  }

  return config;
};

module.exports.setBotConfig = async (key, value) => {
  try {
    const config = await module.exports.getBotConfig();

    config[key] = value;

    await fs.writeFile(Constants.Bot.CONFIG_FILE_PATH, JSON.stringify(config));
  } catch (error) {
    console.log('setBotConfig > ', error);
  }
};

module.exports.getPrivateUserRole = async (context) => {
  const { from } = context.update.message;

  const { TELEGRAM_BOT_OWNER_ID } = process.env;

  const isBotOwner = +TELEGRAM_BOT_OWNER_ID === from.id;

  if (isBotOwner) return Constants.UserRole.Owner;

  try {
    const botUser = await BotUser.findOne({ username: from.username });

    if (botUser) return Constants.UserRole.Admin;
  } catch (error) {
    console.log('getPrivateUserRole error > ', error);
  }

  return Constants.UserRole.Member;
};
