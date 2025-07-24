const express = require('express');
const { authMiddleware } = require('../../../middlewares');
const { profileController } = require('../../../controllers');

const router = express.Router();

router.get('/me', authMiddleware, profileController.getMyProfile);

router.post('/me', authMiddleware, profileController.updateMyProfile);

router.get('/:id', profileController.getUserById);

module.exports = router;
