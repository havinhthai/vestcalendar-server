const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    trim: true,
    type: String,
    required: true,
  },
  times: [{
    trim: true,
    type: String,
    required: true,
  }],
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('telegram_bot_cronjobs', schema);
