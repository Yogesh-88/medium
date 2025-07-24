const express = require('express');
const { validateRegister, validateLogin } = require('../../../validators');
const { authController } = require('../../../controllers');

const router = express.Router();

router.post('/register', validateRegister, authController.register);

router.post('/check-username', authController.checkUsername);

router.post('/login', validateLogin, authController.login);

module.exports = router;
