const rateLimit = require('express-rate-limit');

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req, res, next) => {
        let error = new Error('Too many requests');
        error.status = 429;
        req.flash('error', 'Too many requests, try again in 15 minutes');
        res.redirect('back');
    }
});