const {
  CREATED,
  OK,
} = require('http-status');
const { practicesService } = require('../services');
const catchAsync = require('../utils/catch-async');

const createPractice = catchAsync(async (req, res) => {
  const { from, to } = req.body;
  const { id: userId } = req.user;
  const practice = await practicesService.createPractice({ from, to, userId });
  res.status(CREATED).send(practice);
});

const getPractices = catchAsync(async (req, res) => {
  const { from, to } = req.query;
  const practices = await practicesService.getPractices({ from, to });
  res.status(OK).send(practices);
});

module.exports = {
  createPractice,
  getPractices,
};
