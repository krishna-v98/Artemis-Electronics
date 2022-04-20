const model = require('../models/item');

//show all
exports.index = (req, res, next) => {
    let names = [];
    model.find()
        .then(trades => {
            for (let i = 0; i < trades.length; i++) {
                names.push(trades[i].category);
            }
            let uniqueNames = [...new Set(names)];
            res.render('./trade/index', { trades: trades, names: uniqueNames });
        })
        .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('./trade/new');
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id).populate('author', 'firstName lastName')
        .then(item => {
            if (item) {
                res.render('./trade/show', { item });
            } else {
                let err = new Error('Cannot find item with id \"' + id + '\"');
                err.status = 404;
                throw err;
            }
        })
        .catch(err => {
            next(err);
        });
};

exports.create = (req, res, next) => {
    let input = req.body;
    input.category = input.category.trim();
    input.name = input.name.trim();
    input.description = input.description.trim();
    input.imageLink = input.imageLink.trim();
    let trade = new model(input);
    trade.author = req.session.user;
    trade.save(trade) //should be trade.save not model.save
        .then(() => {
            req.flash('success', 'Trade created successfully');
            res.redirect('/trades');
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(trade => {
            if (trade)
                res.render('./trade/edit', { trade });
            else {
                let err = new Error('Cannot find item to edit with ID ' + id);
                err.status = 404;
                next(err);
            }

        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let trade = req.body;
    trade.category = trade.category.trim();
    trade.name = trade.name.trim();
    trade.description = trade.description.trim();
    trade.imageLink = trade.imageLink.trim();
    let id = req.params.id;

    model.findByIdAndUpdate(id, trade, { userFindAndModify: false, runValidators: true })
        .then(result => {
            if (result) {
                res.redirect('/trades/' + id);
                // console.log(result);
            }
            else {
                let err = new Error('Cannot find item to update with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, { userFindAndModify: false })
        .then(result => {
            if (result)
                res.redirect('/trades');
            else {
                let err = new Error('Cannot find item to delete with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};