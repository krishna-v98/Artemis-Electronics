const Item = require('../models/item');
const User = require('../models/user');
const Exchange = require('../models/exchange');

exports.index = (req, res, next) => {
    let id = req.session.user;
    // Exchange.find({ initiator: id })
    //     .populate('initiator', 'firstName lastName')
    //     .populate('responder', 'firstName lastName')
    //     .populate('initiateItem', 'name')
    //     .populate('respondItem', 'name')
    //     .then(exchanges => {
    //         res.render('./trade/exchanges', { exchanges });
    //     })
    //     .catch(err => next(err));
    res.send('Not implemented');
}

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

        }).catch(err => next(err));
}