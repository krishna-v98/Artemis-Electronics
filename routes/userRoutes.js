const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { isLoggedIn, isGuest } = require('../middlewares/auth');
const { loginLimiter } = require('../middlewares/rateLimiters');
const { validateSignup, validateLogin, validateResult } = require('../middlewares/validator');

router.get('/login', isGuest, controller.login);

router.get('/signup', isGuest, controller.signup);

router.get('/profile', isLoggedIn, controller.profile);

//post request to signup
router.post('/', isGuest, validateSignup, validateResult, controller.create);

//post request to login
router.post('/login', loginLimiter, isGuest, validateLogin, validateResult, controller.authenticate);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
