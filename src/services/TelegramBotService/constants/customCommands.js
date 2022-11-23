/* eslint-disable no-param-reassign */
const { UserRole } = require('./index');
const CronJob = require('../models/CronJob');
const Middlewares = require('../middlewares');
const CommandHandlers = require('../utils/commandHandlers');
const { CronJobs, CronJobService } = require('../services/CronJobService');

module.exports.CommandName = {
  Help: 'help',
  OnBot: 'OnBot',
  OffBot: 'OffBot',

  // AddBotUser: 'AddBotUser',
  // RemoveBotUser: 'RemoveBotUser',

  SendMessage: 'SendMessage',

  GetDailyMessage: 'GetDailyMessage',
  OffDailyMessage: 'OffDailyMessage',
  OnDailyMessage: 'OnDailyMessage',
  SetDailyMessage: 'SetDailyMessage',
};

module.exports.customCommands = [
  {
    group: 0,
    private: true,
    command: module.exports.CommandName.Help,
    description: 'Help',
    roles: [UserRole.Owner, UserRole.Admin, UserRole.Member],
    handlers: [CommandHandlers.onHelp],
  },
  // ---- BOT OWNER
  {
    group: 2,
    private: true,
    command: module.exports.CommandName.OffBot,
    roles: [UserRole.Owner],
    description: 'Deactive bot',
    handlers: [
      Middlewares.Chat.checkPrivateChat,
      Middlewares.Bot.checkBotOwner,
      CommandHandlers.offTagBot,
    ],
  },
  {
    group: 2,
    private: true,
    command: module.exports.CommandName.OnBot,
    roles: [UserRole.Owner],
    description: 'Active bot',
    handlers: [
      Middlewares.Chat.checkPrivateChat,
      Middlewares.Bot.checkBotOwner,
      CommandHandlers.onTagBot,
    ],
  },
  // {
  //   group: 2,
  //   private: true,
  //   roles: [UserRole.Owner],
  //   command: module.exports.CommandName.AddBotUser,
  //   description: 'Add Bot Admin',
  //   handlers: [
  //     Middlewares.Chat.checkPrivateChat,
  //     Middlewares.Bot.checkBotOwner,
  //     CommandHandlers.addBotUser,
  //   ],
  //   steps: [
  //     Middlewares.Bot.SceneStep.inputUsername,
  //     Middlewares.Bot.SceneStep.inputGroupId,
  //     Middlewares.Bot.SceneStep.saveBotUser,
  //   ],
  // },
  // {
  //   group: 2,
  //   private: true,
  //   roles: [UserRole.Owner],
  //   command: module.exports.CommandName.RemoveBotUser,
  //   description: 'Remove Bot Admin',
  //   handlers: [
  //     Middlewares.Chat.checkPrivateChat,
  //     Middlewares.Bot.checkBotOwner,
  //     CommandHandlers.removeBotUser,
  //   ],
  //   steps: [
  //     Middlewares.Bot.SceneStep.inputUsername,
  //     Middlewares.Bot.SceneStep.inputGroupId,
  //     Middlewares.Bot.SceneStep.removeBotUser,
  //   ],
  // },
  {
    group: 2,
    private: true,
    command: module.exports.CommandName.SendMessage,
    roles: [UserRole.Owner, UserRole.Admin],
    description: 'Send message to group via Bot',
    handlers: [
      Middlewares.Chat.checkPrivateChat,
      Middlewares.Bot.checkRolePermission([UserRole.Owner, UserRole.Admin]),
      CommandHandlers.sendMessage,
    ],
  },
  // ---- DAILY MESSAGE
  {
    group: 3,
    private: true,
    roles: [UserRole.Owner, UserRole.Admin],
    command: module.exports.CommandName.GetDailyMessage,
    description: 'Get daily message times.',
    handlers: [Middlewares.Chat.checkPrivateChat, CommandHandlers.getDailyMessage],
  },
  {
    group: 3,
    private: true,
    roles: [UserRole.Owner, UserRole.Admin],
    command: module.exports.CommandName.SetDailyMessage,
    description: 'Change daily message',
    handlers: [Middlewares.Chat.checkPrivateChat, CommandHandlers.setDailyMessage],
    steps: [
      (context) => {
        context.reply('Enter daily message times:\n- 24h format and separated by commas.\n- For example: 07:00, 11:00, 15:00, 17:00, 19:00, 23:00');

        return context.wizard.next();
      },
      async (context) => {
        try {
          let { text: times } = context.update.message;

          // UPDATE CRONJOB
          times = times.split(',');

          CronJobService.setCronJob(
            CronJobs.DAILY_MESSAGE.name,
            times,
            CronJobs.DAILY_MESSAGE.handler(context),
          );

          await CronJob.updateOne({ name: CronJobs.DAILY_MESSAGE.name }, {
            name: CronJobs.DAILY_MESSAGE.name,
            times,
            active: true,
          }, { upsert: true });

          context.reply('Daily message times updated!');
        } catch (error) {
          context.reply(`Error while saving: ${error.message}`);
        }

        return context.scene.leave();
      },
    ],
  },
  {
    group: 3,
    private: true,
    roles: [UserRole.Owner, UserRole.Admin],
    command: module.exports.CommandName.OnDailyMessage,
    description: 'Enable daily message',
    handlers: [Middlewares.Chat.checkPrivateChat, CommandHandlers.onDailyMessage],
  },
  {
    group: 3,
    private: true,
    roles: [UserRole.Owner, UserRole.Admin],
    command: module.exports.CommandName.OffDailyMessage,
    description: 'Disable daily message',
    handlers: [Middlewares.Chat.checkPrivateChat, CommandHandlers.offDailyMessage],
  },
];
