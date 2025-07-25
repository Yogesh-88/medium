const express = require('express');
const { authMiddleware } = require('../../../middlewares');
const { profileController, connectionController } = require('../../../controllers');

const router = express.Router();

router.get('/me', authMiddleware, profileController.getMyProfile);

router.post('/me', authMiddleware, profileController.updateMyProfile);

router.get('/:id', profileController.getUserById);

router.post('/:id/follow', authMiddleware, connectionController.followUser);

router.delete('/:id/unfollow', authMiddleware, connectionController.unfollowUser);

router.get('/:id/followers', authMiddleware, connectionController.getFollowers);

router.get('/:id/following', authMiddleware, connectionController.getFollowing);

module.exports = router;
