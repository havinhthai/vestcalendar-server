const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
  permissions: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: Date,
}, {
  versionKey: false,
});

module.exports = mongoose.model('roles', roleSchema);
