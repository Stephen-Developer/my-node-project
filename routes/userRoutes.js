const express = require('express');
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const userController = require('../controllers/userController');
const userValidation = require('../middleware/userValidation');

//Routes
/**
 * @swagger
 * /users/createNewUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: New user created successfully
 *       400:
 *         description: New user creation failed
 */
router.post('/createNewUser', userValidation.validateUserDetails, asyncHandler(userController.createUser));

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Check user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password is valid
 *       401:
 *         description: Invalid password
 */
router.post('/login', userValidation.validateUserDetails, asyncHandler(userController.checkUserPassword));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all user data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of user data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 */
router.get('/', asyncHandler(userController.getUserData));

/**
 * @swagger
 * /users/reset:
 *   get:
 *     summary: Reset all user data
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User data reset successfully
 *       400:
 *         description: User data reset failed
 */
router.get('/reset', asyncHandler(userController.resetUserData));

module.exports = router;