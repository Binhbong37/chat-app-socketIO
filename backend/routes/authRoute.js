const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/user-register', authController.userRegister);
router.post('/user-login', authController.userLogin);
router.post('/user-logout', authMiddleware, authController.userLogout);

module.exports = router;
