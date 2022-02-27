const model = require('../models/items');

exports.index = (req, res) => {
    let trades = model.find();
    res.render('./trade/index', {trade: trades });
};

exports.new = (req, res) => {
    res.render('./trade/new');
};