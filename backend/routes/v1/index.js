const express = require('express');
const authRouter = require('./auth');
const articlesRouter = require('./articles');
const profileRouter = require('./profile');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', articlesRouter);

router.use('/users', profileRouter);

module.exports = router;
