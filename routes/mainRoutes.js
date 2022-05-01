const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const tradeController = require('../controllers/tradeController');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/about', controller.about);

router.get('/contact', controller.contact);

router.get('/exchanges', isLoggedIn, tradeController.exchangesList);


module.exports = router;