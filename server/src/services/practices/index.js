const { Practice } = require('../../models');

const createPractice = async ({ from, to, userId }) => Practice.create({ from, to, userId });

const getPractices = async ({ from, to }) => {
  const query = {
    ...(from) && { from: { $gte: from } },
    ...(to) && { to: { $lt: to } },
  };

  return Practice.find(query);
};

module.exports = {
  createPractice,
  getPractices,
};
