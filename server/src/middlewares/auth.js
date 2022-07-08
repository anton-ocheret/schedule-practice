const passport = require('passport');
const httpStatus = require('http-status');
const { hasPath } = require('ramda');
const ApiError = require('../utils/api-error');

// Example
const getUsers = function (req, next) {
  if (req.user.role !== 'admin' && req.query.role === 'admin') {
    return next(new ApiError(httpStatus.FORBIDDEN, 'You have no permissions for this request'));
  }
  return next();
};

const auth = async (req, res, next) => passport.authenticate('jwt', { session: false }, (customError, payload, error) => {
  const getError = () => error || customError;
  const data = { user: null, error: false };

  const isAuthenticated = hasPath(['user'], payload);
  const isUnauthorized = hasPath(['message'], getError());

  if (isAuthenticated && !isUnauthorized) {
    data.user = payload.user.toJSON();
    req.user = data.user;
    return getUsers(req, next);
  }

  if (isUnauthorized) {
    next(new ApiError(httpStatus.UNAUTHORIZED, getError().message));
  }

  next();
})(req, res, next);

module.exports = auth;
