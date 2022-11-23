/* eslint-disable no-continue */
const moment = require('moment');
const schedule = require('node-schedule');

const Utils = require('../utils');
const User = require('../../../models/User');
const { Project, WatchProject } = require('../../../models');
// const CronJob = require('../models/CronJob');

module.exports.CronJobs = {
  DAILY_MESSAGE: {
    name: 'DAILY_MESSAGE',
    handler: bot => async () => {
      if (!global.active) return;

      // const cronJob = await CronJob.findOne({
      //   name: module.exports.CronJobs.DAILY_MESSAGE.name,
      // });

      // if (!cronJob) return;

      const nowMoment = moment.utc('00:00', 'HH:mm');

      const nextDayMoment = nowMoment.clone().add(1, 'days');

      const filter = {
        'distributionTimeline.time': {
          $gte: nowMoment.format('YYYY-MM-DD HH:mm'),
          $lt: nextDayMoment.format('YYYY-MM-DD HH:mm'),
        },
      };

      const upcomingProjects = await Project.find(filter, null, { lean: true });

      if (!upcomingProjects.length) return;

      const users = await User.find({
        telegramId: { $exists: true, $ne: null },
        $or: [
          { allListNotification: true },
          { watchListNotification: true },
        ],
      }, null, { lean: true });

      users.forEach(async (u) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const p of upcomingProjects) {
          if (!u.allListNotification) {
            // eslint-disable-next-line no-await-in-loop
            const exists = await WatchProject.exists({ user: u._id, project: p._id });

            if (!exists) continue;
          }

          const distributionTime = p.distributionTimeline.find(t => (
            moment(t.time).isBetween(nowMoment, nextDayMoment, undefined, '[)')
          ));

          if (!distributionTime) continue;

          // Format message
          const formattedDistributionTime = moment(distributionTime.time).format('MMMM Do');

          let photoCaption = `💥*${p.name} (${p.ticker})* token distributions on ${formattedDistributionTime}`;
          photoCaption += `\n\n#${p.name} #${p.ticker} #${distributionTime.title} ${process.env.USER_APP_HOST}`;

          // Escape characters
          photoCaption = Utils.Chat.escapeMarkdownCharacters(photoCaption);

          bot.telegram.sendPhoto(u.telegramId, p.logo, {
            parse_mode: 'MarkdownV2',
            caption: photoCaption,
            reply_markup: {
              inline_keyboard: [
                [{
                  text: `${p.name} on ${process.env.APP_NAME}`,
                  url: `${process.env.USER_APP_HOST}/${p._id}`,
                }],
              ],
            },
          }).catch((error) => {
            console.log('sendPhoto error > ', error);
          });
        }
      });
    },
  },
};

module.exports.CronJobService = class CronJobService {
  static #jobs = {};

  static getCronJob = jobName => this.#jobs[jobName];

  static setCronJob = (jobName, times, handler) => {
    const rule = new schedule.RecurrenceRule();

    rule.tz = 'Asia/Ho_Chi_Minh';

    const hours = [];

    const minutes = [];

    times.forEach((item) => {
      let [hour, minute] = item.split(':');

      hour = +hour;

      minute = +minute;

      hours.push(hour);

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(minute)) {
        minute = 0;
      }

      minutes.push(minute);
    });

    rule.hour = hours;

    rule.minute = minutes;

    let job = this.#jobs[jobName];

    if (job) {
      job.reschedule(rule);
    } else {
      job = schedule.scheduleJob(rule, handler);

      this.#jobs[jobName] = job;
    }

    return job;
  }

  static removeCronJob = (jobName) => {
    if (!this.#jobs[jobName]) return;

    this.#jobs[jobName].cancel();

    this.#jobs[jobName] = undefined;
  }

  static removeAllJob = async () => {
    Object.values(this.#jobs).forEach(schedule.cancelJob);
  };
};
