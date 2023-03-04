const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/abc', authController.testABC);
router.post('/user-register', authController.userRegister);

module.exports = router;
