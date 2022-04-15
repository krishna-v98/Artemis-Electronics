const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { isLoggedIn, isGuest } = require('../middlewares/auth');

router.get('/login', isGuest, controller.login);

router.get('/signup', isGuest, controller.signup);

router.get('/profile', isLoggedIn, controller.profile);

router.post('/', isGuest, controller.create);

router.post('/login', isGuest, controller.authenticate);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
