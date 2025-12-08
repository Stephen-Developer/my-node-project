const express = require('express');
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const userController = require('../controllers/userController');
const userValidation = require('../middleware/userValidation');

//Routes
router.post('/createNewUser', userValidation.validateUserDetails, asyncHandler(userController.createUser));
router.post('/login', userValidation.validateUserDetails, asyncHandler(userController.checkUserPassword));
router.get('/', asyncHandler(userController.getUserData));
router.get('/reset', asyncHandler(userController.resetUserData));

module.exports = router;