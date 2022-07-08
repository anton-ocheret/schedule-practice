const Joi = require('joi');

const createPractice = {
  body: Joi.object().keys({
    from: Joi.date().required(),
    to: Joi.date().required(),
  }),
};

const getPractices = {
  query: Joi.object().keys({
    from: Joi.date(),
    to: Joi.date(),
  }),
};

module.exports = {
  createPractice,
  getPractices,
};
