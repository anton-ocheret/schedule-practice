const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../config/roles');
const { models } = require('../config/constants');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    private: true, // used by the toJSON plugin
  },
  role: {
    type: String,
    enum: Object.keys(roles),
    default: roles.student.id,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.getIsEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return Boolean(user);
};

userSchema.methods.getIsPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model(models.user, userSchema);

module.exports = User;
