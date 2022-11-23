const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    hide: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
  },
  twitterId: {
    type: String,
  },
  telegramId: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
    trim: true,
  },
  resetPasswordExpires: {
    type: Date,
  },
  generalNotification: {
    type: Boolean,
    default: true,
  },
  watchListNotification: {
    type: Boolean,
    default: true,
  },
  allListNotification: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    enum: ['EN', 'VN', 'CN', 'KR'],
    trim: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

userSchema.pre('save', function a(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword.toString(), this.password);
};

module.exports = mongoose.model('users', userSchema);
