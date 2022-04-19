const Item = require('../models/item');

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        req.flash('error', 'You must be logged in to do that');
        res.redirect('/users/login');
    }
};

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        next();
    }
    else {
        req.flash('error', 'Already Logged In');
        res.redirect('/users/profile');
    }
};

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Item.findById(id)
        .then(item => {
            if (item) {
                if (item.author.equals(req.session.user)) {
                    next();
                }
                else {
                    let err = new Error('You are not the author of this item');
                    err.status = 401;
                    next(err);
                }
            }
        })
        .catch(err => next(err));
};