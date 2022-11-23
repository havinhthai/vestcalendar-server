const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingSchema = new Schema({
  generalNotification: {
    type: Boolean,
    default: false,
  },
  watchListNotification: {
    type: Boolean,
    default: false,
  },
  allListNotification: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    enum: ['EN', 'VN', 'CN', 'KR'],
    trim: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('settings', settingSchema);
