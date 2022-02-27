const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');


router.get('/', controller.index);

router.get('/new',controller.new);

module.exports = router;