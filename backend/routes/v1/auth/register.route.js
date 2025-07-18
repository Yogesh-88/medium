const express = require('express');
const { validateRegister } = require('../../../validators/auth');
const { registerController } = require('../../../controllers/auth/');

const router = express.Router();

router.post('/', validateRegister, registerController);

module.exports = router;
