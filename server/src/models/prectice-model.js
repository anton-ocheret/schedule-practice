const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { models } = require('../config/constants');

const practeceSchema = mongoose.Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  user: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: models.user,
  },
});

// add plugin that converts mongoose to json
practeceSchema.plugin(toJSON);

const Practice = mongoose.model(models.practice, practeceSchema);

module.exports = Practice;
