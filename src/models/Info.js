const mongoose = require('mongoose');

const { Schema } = mongoose;

const infoSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  copyright: {
    type: String,
    default: '© 2022 - Vesting Calendar',
  },
  intro: {
    type: String,
    default: '',
  },
  facebookAppId: {
    type: String,
    trim: true,
  },
  facebookPageId: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('infos', infoSchema);
