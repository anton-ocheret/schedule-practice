const Joi = require('joi');
const roles = require('../config/roles');
const { getIsObjectId } = require('./custom-validations');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    color: Joi.string(),
    role: Joi.string().valid(...Object.keys(roles)).default(roles.student.id),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    userId: Joi.string().custom(getIsObjectId).required(),
  }),
};

module.exports = {
  register,
  logout,
  login,
};
