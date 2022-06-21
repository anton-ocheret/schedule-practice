const Joi = require('joi');
const { without } = require('ramda');
const roles = require('../config/roles');
const { getIsObjectId } = require('./custom-validations');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().valid(...without(roles.admin.id, Object.keys(roles))).required(),
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
