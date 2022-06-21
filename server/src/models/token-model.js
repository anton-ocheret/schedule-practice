const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { models } = require('../config/constants');

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: models.user,
  },
  blacklisted: {
    type: Boolean,
    default: false,
  },
});

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token = mongoose.model(models.token, tokenSchema);

module.exports = Token;
