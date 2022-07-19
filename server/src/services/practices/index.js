const { Practice } = require('../../models');

const createPractice = async ({
  from,
  to,
  user,
}) => Practice.create({
  from,
  to,
  user,
});

const getPractices = async ({ from, to }) => {
  const query = {
    ...(from) && { from: { $gte: from } },
    ...(to) && { to: { $lt: to } },
  };

  return Practice.find(query).populate('user');
};

module.exports = {
  createPractice,
  getPractices,
};
