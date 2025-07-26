const express = require('express');
const { authMiddleware } = require('../../../middlewares');
const { articleController, interactionController } = require('../../../controllers');
const { validateArticle } = require('../../../validators');

const router = express.Router();

router.get('/', articleController.getAllArticles);

router.post('/', authMiddleware, validateArticle, articleController.createArticle);

router.get('/:id', articleController.getArticleById);

router.delete('/:id', authMiddleware, articleController.deleteArticle);

router.put('/:id', authMiddleware, validateArticle, articleController.updateArticle);

router.post('/:id/clap', authMiddleware, interactionController.clapArticle);

router.post('/:id/comment', authMiddleware, interactionController.addComment);

router.get('/:id/comments', authMiddleware, interactionController.getCommentsForArticle);

module.exports = router;
