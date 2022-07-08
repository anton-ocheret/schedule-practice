const jwt = require('jsonwebtoken');
const { curry } = require('ramda');
const environment = require('../../config/environment');
const { tokenTypes, tokenExpirations } = require('../../config/constants');
const { Token } = require('../../models');

const getTokenPayload = async (token) => jwt.verify(token, environment.jwt.secret);

const createToken = async (token, userId) => Token.create({
  token,
  user: userId,
});

const generateTokenHandler = (userId, type) => {
  const payload = { type, sub: userId };

  return jwt.sign(payload, environment.jwt.secret, { expiresIn: tokenExpirations[type] });
};

const generateToken = curry(generateTokenHandler);

const generateAuthTokens = async (user) => {
  const generateTokenForUser = generateToken(user.id);
  const access = generateTokenForUser(tokenTypes.access);
  const refresh = generateTokenForUser(tokenTypes.refresh);

  return { access, refresh };
};

const getUserToken = async (userId) => Token.findOne({ user: userId });
const deleteUserToken = async (userId) => Token.deleteMany({ user: userId });

module.exports = {
  createToken,
  getUserToken,
  getTokenPayload,
  deleteUserToken,
  generateAuthTokens,
};
