const express = require('express');
const authRouter = require('./auth');
const articlesRouter = require('./articles');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/articles', articlesRouter);

module.exports = router;
