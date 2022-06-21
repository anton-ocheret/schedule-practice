const { roleNames, permissionNames } = require('./constants');

const roles = {
  [roleNames.student]: {
    id: roleNames.student,
    permissions: [],
  },
  [roleNames.driver]: {
    id: roleNames.driver,
    permissions: [],
  },
  [roleNames.admin]: {
    id: roleNames.admin,
    permissions: [permissionNames.manageUsers],
  },
};

module.exports = roles;
