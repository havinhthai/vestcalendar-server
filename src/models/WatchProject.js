const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const watchProjectSchema = new mongoose.Schema({
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

module.exports = mongoose.model('watch_projects', watchProjectSchema);
