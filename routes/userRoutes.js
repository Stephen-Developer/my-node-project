const express = require('express');
const router = express.Router();

const asyncHandler = require('../utils/asyncHandler');
const userController = require('../controllers/userController');
const userValidation = require('../middleware/userValidation');

//Routes
router.post('/submit', userValidation.validateUserSubmit, asyncHandler(userController.submitUserData));
router.get('/', asyncHandler(userController.getUserData));
router.get('/reset', asyncHandler(userController.resetUserData));

module.exports = router;