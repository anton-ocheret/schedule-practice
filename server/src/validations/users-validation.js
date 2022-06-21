const Joi = require('joi');
const roles = require('../config/roles');
const { getIsObjectId } = require('./custom-validations');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.keys(roles)).required(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().custom(getIsObjectId),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(getIsObjectId),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(getIsObjectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  getUserById,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
};
