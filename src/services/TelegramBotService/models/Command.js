const { Schema, model } = require('mongoose');

const stepSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  valueName: {
    type: String,
    default: '',
  },
});

module.exports.CommandType = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DETELE',
};

const schema = new Schema({
  command: {
    trim: true,
    type: String,
    unique: true,
    required: true,
  },
  responseMessage: {
    trim: true,
    default: '',
    type: String,
  },
  description: {
    trim: true,
    default: '',
    type: String,
  },
  steps: [stepSchema],
  type: {
    type: String,
    required: true,
    enum: Object.keys(module.exports.CommandType),
  },
  roles: [],
}, {
  timestamps: true,
  versionKey: false,
});

module.exports.Command = model('telegram_bot_commands', schema);
