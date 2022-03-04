const model = require('../models/items');

//show all
exports.index = (req, res) => {
    let trades = model.find();
    let names = [];
    for (let i = 0; i < trades.length; i++) {
        names.push(trades[i].category);
    }
    
    let uniqueNames = [...new Set(names)];
    res.render('./trade/index', { trades: trades, names: uniqueNames });
};

exports.new = (req, res) => {
    res.render('./trade/new');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if (item) {
        res.render('./trade/show', { item: item });
    }
    else {
        let err = new Error('Cannot find item with id \"' + id + '\"');
        err.status = 404;
        next(err);
    }
};

exports.create = (req, res) => {
    let trade = req.body;
    model.save(trade);
    res.redirect('/trades');
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if (trade) {
        res.render('./trade/edit', { trade });
    }
    else {
        let err = new Error('Cannot find item to edit with ID ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let trade = req.body;
    let id = req.params.id;
    if (model.updateById(id, trade)) {
        res.redirect('/trades/' + id);
    } else {
        let err = new Error('Cannot find item to update with ID ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/trades');
    }
    else {
        let err = new Error('Cannot find item to delete with ID ' + id);
        err.status = 404;
        next(err);
    }
};