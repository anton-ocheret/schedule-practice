const { User } = require('../../models');

const createUser = async (requestBody) => User.create(requestBody);
const getIsEmailTaken = async (email) => User.getIsEmailTaken(email);
const getUserById = async (userId) => User.findById(userId);
const deleteUserById = async (userId) => User.findByIdAndDelete(userId);

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUser = async (user, updateBody) => {
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const getUserByEmail = async (email) => User.findOne({ email });
const verifyPassword = async ({ password, user }) => user.getIsPasswordMatch(password);

module.exports = {
  getUserByEmail,
  verifyPassword,
  createUser,
  getIsEmailTaken,
  getUserById,
  getUsers,
  deleteUserById,
  updateUser,
};
