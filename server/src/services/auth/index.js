const { usersService, tokensService } = require('..');

const register = async (requestBody) => {
  const data = { isEmailTaken: false, user: null };
  data.isEmailTaken = await usersService.getIsEmailTaken(requestBody.email);
  if (!data.isEmailTaken) {
    data.user = await usersService.createUser(requestBody);
  }
  return data;
};

const login = async (email, password) => {
  const data = { user: null, tokens: null };
  const user = await usersService.getUserByEmail(email);
  const isPasswordValid = user && await usersService.verifyPassword({
    password,
    user,
  });

  if (isPasswordValid) {
    data.user = user;
    data.tokens = await tokensService.generateAuthTokens(user);
    await tokensService.createToken(data.tokens.refresh, user.id);
  }

  return data;
};

const logout = async (userId) => tokensService.deleteUserToken(userId);

module.exports = {
  register,
  login,
  logout,
};
