const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');
const exchangeController = require('../controllers/exchangeController');
const { isAuthor, isLoggedIn, isNotAuthor } = require('../middlewares/auth');
const { validateId, validateTrade, validateResult, dualValidateId } = require('../middlewares/validator');

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

//post to create new trade
router.post('/', isLoggedIn, validateTrade, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

// put to update trade
router.put('/:id', validateId, isLoggedIn, isAuthor, validateTrade, validateResult, controller.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

//post to add item to wishlist
router.post('/:id/wishlist', validateId, isLoggedIn, controller.addTowishlist);

//delete to remove item from wishlist
router.delete('/:id/wishlist', validateId, isLoggedIn, controller.removeFromWishlist);

//post to send exchange request
router.post('/:id1/exchange/:id2', dualValidateId, isLoggedIn, exchangeController.exchange);

router.post('/:id1/exchange/:id2/accept', dualValidateId, isLoggedIn, exchangeController.acceptExchange);

router.post('/:id1/exchange/:id2/reject', dualValidateId, isLoggedIn, exchangeController.rejectExchange);

router.post('/:id1/exchange/:id2/cancel', dualValidateId, isLoggedIn, exchangeController.cancelExchange);



module.exports = router;