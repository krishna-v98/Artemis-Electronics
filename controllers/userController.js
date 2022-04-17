const User = require('../models/user');
const Item = require('../models/item');

exports.login = (req, res, next) => {
    res.render('./user/login');
};

exports.signup = (req, res, next) => {
    res.render('./user/signup');
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), Item.find({ author: id }).sort({ createdAt: -1 })])
        .then(results => {
            const [user, items] = results;
            res.render('./user/profile', { user, items });
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
                req.flash('error', 'User already exists');
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