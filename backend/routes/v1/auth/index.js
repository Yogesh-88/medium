const express = require('express');
const registerRouter = require('./register.route');

const router = express.Router();

router.use('/register', registerRouter);

module.exports = router;
