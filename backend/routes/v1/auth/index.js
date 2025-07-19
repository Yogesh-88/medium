const express = require('express');
const { validateRegister } = require('../../../validators/auth');
const { registerController, checkUsernameController } = require('../../../controllers/auth');

const router = express.Router();

router.post('/register', validateRegister, registerController);
router.post('/check-username', checkUsernameController);

module.exports = router;
