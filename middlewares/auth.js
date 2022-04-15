exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid ID');
        err.status = 400;
        next(err);
    }
};

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