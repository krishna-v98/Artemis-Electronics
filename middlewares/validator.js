const { body, validationResult } = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid ID');
        err.status = 400;
        next(err);
    }
    else {
        next();
    }
};

exports.validateSignup = [
    body('firstName', 'first name is required').notEmpty().trim().escape(),
    body('lastName', 'last name is required').notEmpty().trim().escape(),
    body('email', 'email is required').notEmpty().trim().isEmail().normalizeEmail().escape(),
    body('password', 'password is required').notEmpty().trim().isLength({ min: 5, max: 64 }).escape(),
];


exports.validateLogin = [
    body('email', 'email is required').notEmpty().trim().isEmail().normalizeEmail().escape(),
    body('password', 'password is required').notEmpty().trim().isLength({ min: 6, max: 64 }).escape(),
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else
        return next();
};

exports.validateTrade = [
    body('name', 'name is required').notEmpty().trim().escape(),
    body('price', 'price is required').notEmpty().trim().escape(),
    body('description', 'description is required').trim().escape().isLength({ min: 10, max: 255 }),
    body('category', 'category is required').notEmpty().trim().escape(),
];


exports.dualValidateId = (req, res, next) => {
    let id1 = req.params.id1;
    let id2 = req.params.id2;

    if (!id1.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid ID');
        err.status = 400;
        next(err);
    }
    else if (!id2.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid ID');
        err.status = 400;
        next(err);
    }
    else {
        next();
    }
}


