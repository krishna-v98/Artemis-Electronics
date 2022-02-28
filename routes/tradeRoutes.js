const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');


router.get('/', controller.index);

router.get('/new',controller.new);

router.get('/:id', controller.show);

module.exports = router;