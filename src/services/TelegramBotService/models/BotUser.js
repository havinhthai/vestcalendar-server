const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    trim: true,
    type: String,
    required: true,
  },
  group: {
    trim: true,
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = model('telegram_bot_users', schema);
