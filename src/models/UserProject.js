const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const userProjectSchema = new mongoose.Schema({
  project: {
    type: ObjectId,
    ref: 'projects',
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'users',
    required: true,
  },
}, {
  versionKey: false,
  timestamps: false,
});

module.exports = mongoose.model('user_projects', userProjectSchema);
