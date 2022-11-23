const Utils = require('./index');
const Constants = require('../constants');
const CronJob = require('../models/CronJob');
const CustomCommands = require('../constants/customCommands');
const { CronJobs, CronJobService } = require('../services/CronJobService');

module.exports.offTagBot = async (context) => {
  global.active = false;

  context.reply(`All bot functions disabled! You can turn it back on with (/${CustomCommands.CommandName.OnBot}) at any time.`);

  Utils.Bot.setBotConfig(Constants.Bot.CONFIG_KEY.ACTIVE, false);
};

module.exports.onTagBot = async (context) => {
  global.active = true;

  context.reply(`All bot functions enabled! To disable, type (/${CustomCommands.CommandName.OffBot}).`);

  Utils.Bot.setBotConfig(Constants.Bot.CONFIG_KEY.ACTIVE, true);
};

module.exports.onHelp = async (context) => {
  const { chat } = context.update.message;

  const privateChat = chat.type === 'private';

  let userRole;

  if (privateChat) {
    userRole = await Utils.Bot.getPrivateUserRole(context);
  }

  const commandList = CustomCommands.customCommands.filter((x) => {
    if (privateChat) {
      return x.private && x.roles.indexOf(userRole) > -1;
    }

    return !x.private;
  });

  if (!commandList.length) return;

  const helpMessage = Utils.Chat.generateHelpMessage(commandList);

  context.reply(helpMessage);
};

module.exports.addBotUser = (context) => {
  context.scene.enter(CustomCommands.CommandName.AddBotUser);
};

module.exports.removeBotUser = (context) => {
  context.scene.enter(CustomCommands.CommandName.RemoveBotUser);
};

module.exports.sendMessage = async (context) => {
  try {
    let { text } = context.update.message;

    text = text.trim();

    const params = text.split(' ');

    const paramLength = 1;

    const message = params.slice(paramLength).join(' ').trim();

    if (params.length < paramLength || !message) {
      context.reply(`/${CustomCommands.CommandName.SendMessage} [message]`);
      return;
    }

    const chatId = process.env.TELEGRAM_CHAT_ID;

    // const chat = await context.telegram.getChat(chatId);

    await context.telegram.sendMessage(chatId, message);
  } catch (error) {
    console.log('sendMessage error > ', error);
    context.reply(`Error while send message: ${error.message}`);
  }
};

module.exports.getDailyMessage = async (context) => {
  const cronJob = await CronJob.findOne({ name: CronJobs.DAILY_MESSAGE.name });

  if (!cronJob) {
    context.reply("Haven't set up daily message yet.");
    return;
  }

  context.reply(`Daily message times: ${cronJob.times.join(', ')}`);
};

module.exports.setDailyMessage = async (context) => {
  context.scene.enter(CustomCommands.CommandName.SetDailyMessage);
};

module.exports.onDailyMessage = async (context) => {
  const cronJob = await CronJob.findOne({ name: CronJobs.DAILY_MESSAGE.name });

  if (!cronJob) {
    context.reply("Haven't set up daily message yet.");
    return;
  }

  if (!cronJob.active) {
    cronJob.active = true;

    await cronJob.save();

    CronJobService.setCronJob(
      CronJobs.DAILY_MESSAGE.name,
      cronJob.time,
      CronJobs.DAILY_MESSAGE.handler(context),
    );
  }

  context.reply('Daily message enabled.');
};

module.exports.offDailyMessage = async (context) => {
  const cronJob = await CronJob.findOne({ name: CronJobs.DAILY_MESSAGE.name });

  if (!cronJob) {
    context.reply("Haven't set up daily message yet.");
    return;
  }

  if (cronJob.active) {
    cronJob.active = false;

    await cronJob.save();

    CronJobService.removeCronJob(CronJobs.DAILY_MESSAGE.name);
  }

  context.reply('Daily message disabled.');
};
