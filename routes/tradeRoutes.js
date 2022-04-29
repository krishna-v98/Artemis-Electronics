const express = require('express');
const router = express.Router();
const controller = require('../controllers/tradeController');
const { isAuthor, isLoggedIn, isNotAuthor } = require('../middlewares/auth');
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

//post to add item to wishlist
router.post('/:id/wishlist', validateId, isLoggedIn, isNotAuthor, controller.addTowishlist);

//delete to remove item from wishlist
router.delete('/:id/wishlist', validateId, isLoggedIn, isNotAuthor, controller.removeFromWishlist);

// router.get('/:id/trades/:id/exchange/:id2', (req, res, next) => {
//     let id = req.params.id;
//     let id2 = req.params.id2;
//     res.send(id + ' ' + id2);
// });

module.exports = router;