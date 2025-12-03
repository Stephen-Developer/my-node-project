const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//Routes
router.post('/submit', userController.submitUserData);
router.get('/', userController.getUserData);
router.get('/reset', userController.resetUserData);

module.exports = router;