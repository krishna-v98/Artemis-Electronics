const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');


let trades;

exports.getCollection = db => {
    trades = db.collection('trades');
};

exports.find = () => trades.find().toArray();

exports.findById = id => trades.findOne({ _id: ObjectId(id) });

exports.save = trade => trades.insertOne(trade);

exports.updateById = (id, newTrade) => trades.updateOne({ _id: ObjectId(id) }, {
    $set: {
        name: newTrade.name,
        price: newTrade.price,
        imageLink: newTrade.imageLink,
        description: newTrade.description,
        category: newTrade.category,
        status: newTrade.status
    }
});



exports.deleteById = id => trades.deleteOne({ _id: ObjectId(id) });