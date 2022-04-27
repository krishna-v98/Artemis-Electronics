const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');
const { isAuthor, isLoggedIn } = require('../middlewares/auth');
const { validateId, validateTrade, validateResult } = require('../middlewares/validator');

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

//post to create new trade
router.post('/', isLoggedIn, validateTrade, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

// put to update trade
router.put('/:id', validateId, isLoggedIn, isAuthor, validateTrade, validateResult, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;