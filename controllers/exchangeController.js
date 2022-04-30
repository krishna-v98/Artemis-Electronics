const Item = require('../models/trade');
const User = require('../models/user');
const Exchange = require('../models/exchange');

exports.exchange = (req, res, next) => {
    let respondItem = req.params.id1;
    let initiateItem = req.params.id2;
    let initiator = req.session.user;

    Promise.all([User.findById(initiator), Item.findById(respondItem), Item.findById(initiateItem)])
        .then(results => {
            const [initiator, respondItem, initiateItem] = results;
            if (!respondItem) {
                let err = new Error('Cannot find item with id \"' + respondItem + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }
            if (!initiateItem) {
                let err = new Error('Cannot find item with id \"' + initiateItem + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }
            if (!initiator) {
                let err = new Error('Cannot find user with id \"' + initiator + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            Exchange.findOne({
                initiator: initiator._id,
                responder: respondItem.author._id,
                initiateItem: initiateItem._id,
                respondItem: respondItem._id
            }).then(exchange => {
                if (exchange) {
                    req.flash('error', 'You have already sent an exchange request for this item');
                    return res.redirect('back');
                } else {
                    let exchange = new Exchange({
                        initiator: initiator,
                        responder: respondItem.author._id,
                        initiateItem: initiateItem,
                        respondItem: respondItem,
                        status: 'pending'
                    });

                    exchange.save()
                        .then(() => {
                            req.flash('success', 'Trade request sent');
                            res.redirect('/users/profile');
                        }
                        )
                        .catch(err => next(err));
                }
            }).catch(err => next(err));

        }).catch(err => next(err));
}