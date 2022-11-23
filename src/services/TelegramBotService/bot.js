/* eslint-disable no-param-reassign */
const { Telegraf, Scenes } = require('telegraf');

const Utils = require('./utils');
const CronJob = require('./models/CronJob');
const Middlewares = require('./middlewares');
const { Command } = require('./models/Command');
const { CronJobService, CronJobs } = require('./services/CronJobService');
const { customCommands, CommandName } = require('./constants/customCommands');

module.exports = class TelegramBot {
  #telegraf = null;

  constructor(accessToken) {
    this.#telegraf = new Telegraf(accessToken);
  }

  getTelegrafInstance = () => this.#telegraf;

  start = async () => {
    Utils.log('Starting Telegram bot!');

    await this.#getBotActive();

    this.#addCronJobs();

    this.#addEventListeners();

    await this.#addCommandListeners();

    this.#telegraf.launch();

    Utils.log('Telegram bot is running!');
  }

  stop = (reason) => {
    Utils.log('Stopping bot process!');

    this.#telegraf.stop(reason);

    CronJobService.removeAllJob();

    Utils.log('Bot is stopped!');
  }

  #getBotActive = async () => {
    const config = await Utils.Bot.getBotConfig();

    global.active = config.active;
  }

  #getScenes = async (commands) => {
    const scenes = [];

    if (!commands) {
      commands = await Command.find({}, null, { lean: true });
    }

    commands.forEach((item) => {
      if (!item.steps?.length) return;

      const commandScene = new Scenes.WizardScene(item.command, ...item.steps);

      scenes.push(commandScene);
    });

    return scenes;
  }

  #addCommandListeners = async () => {
    const customScenes = await this.#getScenes(customCommands);

    const stages = new Scenes.Stage(customScenes);

    const { default: session } = await import('@telegraf/session');

    this.#telegraf.use(session());

    this.#telegraf.use(stages.middleware());

    // ---- ADD CUSTOM COMMANDs
    customCommands.forEach((item) => {
      const middlewareHandlers = [];

      // Bot activation middleware
      if ([CommandName.OffBot, CommandName.OnBot].indexOf(item.command) === -1) {
        middlewareHandlers.push(Middlewares.Bot.checkBotActive);
      }

      this.#telegraf.command(item.command, ...middlewareHandlers, ...item.handlers);
    });
  }

  #addEventListeners = () => {
    this.#telegraf.catch((error) => {
      Utils.log('onError > ', error);
    });
  }

  #addCronJobs = async () => {
    const jobs = await CronJob.find({ active: true }).lean();

    jobs.forEach((j) => {
      CronJobService.setCronJob(j.name, j.times, CronJobs[j.name]?.handler(this.#telegraf));
    });
  }
};
