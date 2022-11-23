const { validationResult } = require('express-validator');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { checkPermission } = require('../helpers/permission');
const apiErrors = require('./apiErrors');
const emailTemplates = require('./emailTemplates');

const { ObjectId } = mongoose.Types;

module.exports = {
  isMongoId: (id) => {
    try {
      return ObjectId.isValid(id);
    } catch (error) {
      return false;
    }
  },

  toObjectId: id => ObjectId(id),

  formatDate: (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);

    return (`${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`);
  },

  truncateText: (txt, limit = 65) => {
    if (txt.length <= limit) return txt;

    return `${txt.slice(0, limit).trim()}...`;
  },

  countPerPage: (no, currentPage, perPage = 20) => perPage * (currentPage - 1) + 1 + no,

  getPerPage: (limit = 20) => (limit * 1 > 50 ? 50 : limit * 1),

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line
    }
  },

  // eslint-disable-next-line max-len
  getPageSize: (limit, maxLimit = 50) => Math.ceil((!limit || limit <= 0 || limit >= maxLimit) ? maxLimit : +limit),

  roundValue: (value) => {
    if (typeof value !== 'number') return 0;

    return Math.round((value + Number.EPSILON) * 100) / 100;
  },


  checkValidateErrors: (req) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return false;

    errors.array().forEach((error) => {
      req.flash('danger', error.msg);
    });

    return true;
  },

  genCryptoToken: () => (
    new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) reject(err);

        const token = buf.toString('hex');

        resolve(token);
      });
    })
  ),

  fuzzySearch: (text) => {
    const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    return new RegExp(regex, 'gi');
  },

  checkPermission,

  apiErrors,

  apiResponse: (obj = {}, message = 'success') => ({
    status: 200,
    code: 200,
    message,
    ...obj,
  }),

  emailTemplates,

  arrRandomArray: (array, number = null) => {
    const { length } = array;
    const randElements = number || Math.ceil(Math.random() * length) - 1;
    let indices = [];

    for (let i = 0; i < randElements; i += 1) {
      const index = Math.ceil(Math.random() * length) - 1;
      indices.push(index);
    }

    indices = indices.filter((x, i, a) => a.indexOf(x) === i);
    const arr = indices.map(index => array[index]);

    return (number && number === 1) ? arr[0] : arr;
  },

  parseQueryStatus: (value) => {
    if (value === '0' || value === '1') {
      return value === '1';
    }
    return { $in: [true, false] };
  },

  formatDateTimeInput: (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);

    return (`${dateTime.getDate().toString().padStart(2, 0)}/${(dateTime.getMonth() + 1).toString().padStart(2, 0)}/${dateTime.getFullYear()} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`);
  },

  // convert "d/m/Y H:i" to valid date time
  convertDateTime: (dateTime) => {
    const itemDate = dateTime.substring(0, dateTime.indexOf(' '));
    const itemDateSegments = itemDate.split('/');
    const itemTime = dateTime.substring(dateTime.indexOf(' ') + 1);
    const itemTimeSegments = itemTime.split(':');

    return new Date(
      itemDateSegments[2],
      parseInt(itemDateSegments[1], 10) - 1,
      itemDateSegments[0],
      itemTimeSegments[0],
      itemTimeSegments[1],
    );
  },
};
