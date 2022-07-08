const environment = require('./environment');

const models = {
  user: 'User',
  token: 'Token',
  practice: 'Practice',
};

const roleNames = {
  student: 'student',
  driver: 'driver',
  admin: 'admin',
};

const permissionNames = {
  manageUsers: 'managerUsers',
};

const tokenTypes = {
  access: 'access',
  refresh: 'refresh',
  verifyEmail: 'verifyEmail',
  resetPassword: 'resetPassword',
};

const tokenExpirations = {
  access: `${environment.jwt.accessExpirationMinutes} minutes`,
  refresh: `${environment.jwt.refreshExpirationDays} days`,
  verifyEmail: `${environment.jwt.verifyEmailExpirationMinutes} minutes`,
  resetPassword: `${environment.jwt.resetPasswordExpirationMinutes} minutes`,
};

module.exports = {
  models,
  roleNames,
  tokenTypes,
  tokenExpirations,
  permissionNames,
};
