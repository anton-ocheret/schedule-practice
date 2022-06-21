const {
  CREATED,
  BAD_REQUEST,
  OK,
  NO_CONTENT,
} = require('http-status');
const catchAsync = require('../utils/catch-async');
const { authService } = require('../services');
const ApiError = require('../utils/api-error');

const register = catchAsync(async (request, response) => {
  const { isEmailTaken, user } = await authService.register(request.body);
  if (isEmailTaken) throw new ApiError(BAD_REQUEST, 'The email has already taken');
  response.status(CREATED).send(user);
});

const login = catchAsync(async (request, response) => {
  const { email, password } = request.body;
  const { user, tokens, authentificated } = await authService.login(email, password);
  if (authentificated) throw new ApiError(BAD_REQUEST, 'User has already authentificated');
  if (!user) throw new ApiError(BAD_REQUEST, 'Login or Password is incorrect');
  response.status(OK).send({ user, tokens });
});

const logout = catchAsync(async (request, response) => {
  const logouted = await authService.logout(request.body.userId);
  if (!logouted) throw new ApiError(BAD_REQUEST, 'User is not logged in');
  response.status(NO_CONTENT).send();
});

module.exports = {
  logout,
  register,
  login,
};
