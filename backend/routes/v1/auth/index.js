const express = require('express');
const { validateRegister, validateLogin } = require('../../../validators');
const {
  registerController,
  checkUsernameController,
  loginController,
} = require('../../../controllers');

const router = express.Router();

router.post('/register', validateRegister, registerController);

router.post('/check-username', checkUsernameController);

router.post('/login', validateLogin, loginController);

module.exports = router;
