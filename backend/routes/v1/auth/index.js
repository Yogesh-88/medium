/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and account management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *
 *             properties:
 *               username:
 *                 type: string
 *                 example: king
 *               firstName:
 *                  type: string
 *                  example: "John"
 *               lastName:
 *                  type: string
 *                  example: "Snow"
 *               email:
 *                 type: string
 *                 example: johnsnow@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               confirmPassword:
 *                  type: string
 *                  example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Conflict username or email already exists
 */

/**
 * @swagger
 * /auth/check-username:
 *   get:
 *     summary: Check if a username is available
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username to check
 *     responses:
 *       200:
 *         description: Username availability status
 *       409:
 *         description: Username is already taken
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: kira
 *               password:
 *                 type: string
 *                 example: Light@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

const express = require('express');
const { validateRegisterData, validateLoginData } = require('../../../validators');
const { authController } = require('../../../controllers');

const router = express.Router();

router.post('/register', validateRegisterData, authController.register);

router.get('/check-username', authController.checkUsername);

router.post('/login', validateLoginData, authController.login);

module.exports = router;
