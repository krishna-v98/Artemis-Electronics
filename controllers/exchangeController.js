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

            if (initiateItem.author._id == initiator._id) {
                let err = new Error('You cannot trade your own item');
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


exports.acceptExchange = (req, res, next) => {
    let respondItem = req.params.id1; //current user's item
    let initiateItem = req.params.id2; //request user's item
    let responder = req.session.user;

    Promise.all([User.findById(responder), Item.findById(respondItem), Item.findById(initiateItem)])
        .then(results => {
            const [responder, respondItem, initiateItem] = results;
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
            if (!responder) {
                let err = new Error('Cannot find user with id \"' + responder + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            if (respondItem.author._id == responder._id) {
                let err = new Error('You cannot trade your own item');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            Exchange.findOne({
                initiator: initiateItem.author._id,
                responder: responder._id,
                initiateItem: initiateItem._id,
                respondItem: respondItem._id,
                status: 'pending'
            }).then(exchange => {
                if (!exchange) {
                    let err = new Error('No exchange request found');
                    err.status = 404;
                    req.flash('error', err.message);
                    return res.redirect('back');
                } else {
                    // responder object is available, initiator is available only through initiator Object's item author id

                    let initiatedAuthor = initiateItem.author._id;
                    initiateItem.author = responder._id;
                    respondItem.author = initiatedAuthor;
                    exchange.status = 'accepted';

                    Promise.all([initiateItem.save(), respondItem.save(), exchange.save()])
                        .then(() => {
                            req.flash('success', 'Trade request accepted');
                            res.redirect('back');
                        }).catch(err => next(err));
                }
            }).catch(err => next(err));
        })
        .catch(err => next(err));
}

exports.rejectExchange = (req, res, next) => {
    let respondItem = req.params.id1; //current user's item
    let initiateItem = req.params.id2; //request user's item
    let responder = req.session.user;

    Promise.all([User.findById(responder), Item.findById(respondItem), Item.findById(initiateItem)])
        .then(results => {
            const [responder, respondItem, initiateItem] = results;
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
            if (!responder) {

                let err = new Error('Cannot find user with id \"' + responder + '\"');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            if (respondItem.author._id == responder._id) {
                let err = new Error('You cannot trade your own item');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            Exchange.findOne({
                initiator: initiateItem.author._id,
                responder: responder._id,
                initiateItem: initiateItem._id,
                respondItem: respondItem._id,
                status: 'pending'
            }).then(exchange => {
                if (!exchange) {
                    let err = new Error('No exchange request found');
                    err.status = 404;
                    req.flash('error', err.message);
                    return res.redirect('back');
                } else {
                    exchange.status = 'rejected';
                    exchange.save()
                        .then(() => {
                            req.flash('success', 'Trade request rejected');
                            res.redirect('back');
                        }
                        )
                        .catch(err => next(err));
                }
            }).catch(err => next(err));
        })
        .catch(err => next(err));
}

exports.cancelExchange = (req, res, next) => {
    let respondItem = req.params.id1; //request user's item
    let initiateItem = req.params.id2; //current user's item
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

            if (respondItem.author._id == initiator._id) {
                let err = new Error('You cannot trade your own item');
                err.status = 404;
                req.flash('error', err.message);
                return res.redirect('back');
            }

            Exchange.findOne({
                initiator: initiator._id,
                responder: respondItem.author._id,
                initiateItem: initiateItem._id,
                respondItem: respondItem._id,
                status: 'pending'
            }).then(exchange => {
                if (!exchange) {
                    let err = new Error('No exchange request found');
                    err.status = 404;
                    req.flash('error', err.message);
                    return res.redirect('back');
                } else {
                    //remove exchange
                    exchange.remove()
                        .then(() => {
                            req.flash('success', 'Trade request cancelled');
                            res.redirect('back');
                        }
                        )
                        .catch(err => next(err));
                }
            }).catch(err => next(err));
        })
        .catch(err => next(err));
}


