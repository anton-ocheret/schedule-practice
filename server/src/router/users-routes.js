const express = require('express');
const validate = require('../middlewares/validate');
const { usersController } = require('../controllers');
const { usersValidation } = require('../validations');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .post(validate(usersValidation.createUser), usersController.createUser)
  .get(validate(usersValidation.getUsers), auth, usersController.getUsers);

router.route('/:userId')
  .get(validate(usersValidation.getUserById), usersController.getUser)
  .patch(validate(usersValidation.updateUser), usersController.updateUser)
  .delete(validate(usersValidation.deleteUser), usersController.deleteUser);

module.exports = router;
