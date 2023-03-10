const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/user-register', authController.userRegister);
router.post('/user-login', authController.userLogin);

module.exports = router;
