const mongoose = require('mongoose');

const { Schema } = mongoose;

const mediaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  keyName: {
    type: String,
    trim: true,
  },
  mimeType: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  uploadBy: {
    type: Schema.Types.ObjectId,
    ref: 'administrators',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('medias', mediaSchema);
