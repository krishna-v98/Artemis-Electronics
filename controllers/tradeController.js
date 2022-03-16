const model = require('../models/items');

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

    //make sure entered ID is in correct format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then(item => {
            if (item) {
                res.render('./trade/show', { item: item });
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
    let trade = new model(req.body);
    trade.category = trade.category.trim();
    trade.name = trade.name.trim();
    model.save(trade)
        .then(result => res.redirect('/trades'))
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }

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
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, trade, { userFindAndModify: false, runValidators: true })
        .then(result => {
            if (result)
                res.redirect('/trades/' + id);
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

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }

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