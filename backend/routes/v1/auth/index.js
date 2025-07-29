const express = require('express');
const { validateRegisterData, validateLoginData } = require('../../../validators');
const { authController } = require('../../../controllers');

const router = express.Router();

router.post('/register', validateRegisterData, authController.register);

router.post('/check-username', authController.checkUsername);

router.post('/login', validateLoginData, authController.login);

module.exports = router;
