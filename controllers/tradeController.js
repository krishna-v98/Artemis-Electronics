const model = require('../models/items');

//show all
exports.index = (req, res) => {
    let trades = model.find();
    res.render('./trade/index', { trade: trades });
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