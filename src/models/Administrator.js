const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const administratorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.jpg',
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles',
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
}, {
  timestamps: true,
  versionKey: false,
});

administratorSchema.pre('save', function a(next) {
  const administrator = this;

  if (!administrator.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(administrator.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      administrator.password = hash;
      next();
    });
  });
});

administratorSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('administrators', administratorSchema);
