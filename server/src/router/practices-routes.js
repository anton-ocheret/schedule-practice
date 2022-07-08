const express = require('express');
const validate = require('../middlewares/validate');
const { practicesValidation } = require('../validations');
const { practicesController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .post(validate(practicesValidation.createPractice), auth, practicesController.createPractice)
  .get(validate(practicesValidation.getPractices), practicesController.getPractices);

module.exports = router;
