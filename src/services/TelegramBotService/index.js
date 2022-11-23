// import setupDB from './setupDB';
const TelegramBot = require('./bot');

let bot;

module.exports = class TelegramBotService {
  #bot = new TelegramBot(process.env.TELEGRAM_BOT_ACCESS_TOKEN);

  constructor() {
    bot = this.#bot;
  }


  static getTelegrafInstance = () => bot.getTelegrafInstance();

  run = async () => {
    // await setupDB();

    await this.#bot.start();

    process.once('SIGINT', this.#onKill('SIGINT'));

    process.once('SIGTERM', this.#onKill('SIGTERM'));
  }

  #onKill = reason => () => {
    this.#bot.stop(reason);
  }
};
