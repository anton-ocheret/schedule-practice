const { roleNames } = require('./constants');

const roles = {
  [roleNames.student]: {
    id: roleNames.student,
    permissions: [],
  },
};

module.exports = roles;
