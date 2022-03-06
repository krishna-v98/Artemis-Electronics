const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');


let trades;

exports.getCollection = db => {
    trades = db.collection('trades');
};

exports.find = () => trades.find().toArray();

exports.findById = id => trades.find(trade => trade.id === id);

exports.save = trade => {
    trade.id = uuidv4();
    trade.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    trades.push(trade);
};

exports.updateById = (id, newTrade) => {
    let trade = trades.find(trade => trade.id === id);
    if (trade) {
        trade.name = newTrade.name;
        trade.price = newTrade.price;
        trade.imageLink = newTrade.imageLink;
        trade.description = newTrade.description;
        trade.category = newTrade.category;
        trade.status = 'available';
        return true;
    }
    else return false;
}


exports.deleteById = id => {
    let index = trades.findIndex(trade => trade.id === id);
    if (index != -1) {
        trades.splice(index, 1);
        return true;
    }
    else return false;
}