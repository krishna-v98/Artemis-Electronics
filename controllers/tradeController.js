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
    console.log(uniqueNames);
};

exports.new = (req, res) => {
    res.render('./trade/new');
};

exports.show = (req, res) => {
    let id = req.params.id;
    let item = model.findById(id);
    if (item != -1) {
        res.render('./trade/show', { item: item });
    }
    else {
        res.status(404).send('Item not found');
    }
};

exports.create = (req, res) => {
    let trade = req.body;
    model.save(trade);
    res.redirect('/trades');
};

exports.edit = (req, res) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if (trade) {
        res.render('./trade/edit', { trade });
    }
    else
        res.status(404).send('item not found');
};

exports.update = (req, res) => {
    let trade = req.body;
    let id = req.params.id;
    if (model.updateById(id, trade)) {
        res.redirect('/trades/' + id);
    } else
        res.status(404).send('can\'t edit');
};

exports.delete = (req, res) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/trades');
    }
    else res.status(404).send('404 item not found');
};