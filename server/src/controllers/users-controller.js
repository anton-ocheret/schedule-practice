const {
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
  NO_CONTENT,
} = require('http-status');
const { pick } = require('ramda');
const catchAsync = require('../utils/catch-async');
const { usersService } = require('../services');
const ApiError = require('../utils/api-error');

const createUser = catchAsync(async (req, res) => {
  const isEmailTaken = await usersService.getIsEmailTaken(req.body.email);
  if (isEmailTaken) {
    throw new ApiError(BAD_REQUEST, 'The email has already taken');
  }
  const createdUser = await usersService.createUser(req.body);
  res.status(CREATED).send(createdUser);
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);
  if (!user) throw new ApiError(NOT_FOUND, `User with id ${userId} not found`);
  res.status(OK).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(['name', 'role'], req.query);
  const options = pick(['sortBy', 'limit', 'page'], req.query);
  const result = await usersService.getUsers(filter, options);
  res.status(OK).send(result);
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await usersService.deleteUserById(userId);
  if (!deletedUser) throw new ApiError(NOT_FOUND, `User with id ${userId} not found`);
  res.status(NO_CONTENT).send();
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await usersService.getUserById(userId);
  if (!user) throw new ApiError(NOT_FOUND, `User with id ${userId} not found`);

  const isEmailTaken = await usersService.getIsEmailTaken(req.body.email);
  if (isEmailTaken) {
    throw new ApiError(BAD_REQUEST, 'The email has already taken');
  }
  const updatedUser = await usersService.updateUser(user, req.body);
  res.status(OK).send(updatedUser);
});

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
};
