const express = require('express');
const { authMiddleware } = require('../../../middlewares');
const { tagsController } = require('../../../controllers');

const router = express.Router();

router.get('/trending', authMiddleware, tagsController.getTrendingTags);

module.exports = router;
