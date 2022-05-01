const User = require('../models/user');
const Item = require('../models/trade');
const Exchange = require('../models/exchange');

exports.login = (req, res, next) => {
    res.render('./user/login');
};

exports.signup = (req, res, next) => {
    res.render('./user/signup');
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([
        User.findById(id).populate('wishlist'),
        Item.find({ author: id }).sort({ createdAt: -1 }),
        Exchange.find({ initiator: id, status:'pending' })
            .populate('initiateItem', 'name imageLink price')
            .populate('respondItem', 'name imageLink price')
            .populate('responder', 'firstName lastName').sort({ createdAt: -1 }),
        Exchange.find({ responder: id, status: 'pending' })
            .populate('initiateItem', 'name imageLink price')
            .populate('respondItem', 'name imageLink price')
            .populate('initiator', 'firstName lastName').sort({ createdAt: -1 })
    ])
        .then(results => {
            const [user, items, requestsSent, requestsReceived] = results;
            res.render('./user/profile', { user, items, requestsSent, requestsReceived });
        })
        .catch(err => next(err));
};

exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => {
            req.flash('success', 'User created successfully');
            res.redirect('/users/login');
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/signup');
            }
            if (err.code === 11000) {
                req.flash('error', 'Email already in use');
                return res.redirect('/users/signup');
            }
            next(err);
        });
};

exports.authenticate = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.flash('success', 'Welcome back ' + user.firstName);
                            res.redirect('/users/profile');
                        }
                        else {
                            req.flash('error', 'Invalid password');
                            res.redirect('/users/login');
                        }
                    })
                    .catch(err => next(err));
            }
            else {
                req.flash('error', 'Invalid email');
                res.redirect('/users/login');
            }
        })
        .catch(err => next(err));
};




exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err);
        }
        res.redirect('/');
    });
};