const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const trades = [
    {
        id: 'a1',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'ROG Zephyrus G15',
        price: '$1800',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://rog.asus.com/media/1578098363696.jpg',
        category: 'Laptops'
    },
    {
        id: 'a2',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'Apple Macbook Pro M1',
        price: '$2000',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-gallery1-202110?wid=4000&hei=3072&fmt=jpeg&qlt=80&.v=1632799176000',
        category: 'Laptops'
    },
    {
        id: 'a3',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'Apple Macbook Pro M1 Max',
        price: '$2500',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://www.bhphotovideo.com/images/images2500x2500/apple_mbp_16_sg_25_16_2_macbook_pro_with_1668323.jpg',
        category: 'Laptops'
    },
    {
        id: 'b1',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'iPhone 13 Pro Max',
        price: '$1300',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://rog.asus.com/media/1578098363696.jpg',
        category: 'Mobiles'
    },
    {
        id: 'b2',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'iPhone 13 Pro ',
        price: '$1200',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://rog.asus.com/media/1578098363696.jpg',
        category: 'Mobiles',
    },
    {
        id: 'c1',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'JBL Charge 5',
        price: '$180',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://rog.asus.com/media/1578098363696.jpg',
        category: 'Sound',
    },
    {
        id: 'c2',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
        name: 'Bose Soundbar ',
        price: '$800',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.',
        imageLink: 'https://rog.asus.com/media/1578098363696.jpg',
        category: 'Sound',
    },
];

let names = Object.keys(trades);

exports.find = () => trades;

exports.findById = id => trades.find(trade => trade.id === id);

exports.save = trade => {
    trade.id = uuidv4();
    trade.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    trades.push(trade);
    console.log(trades);
};

exports.updateById = (id, newTrade) => {
    let trade = trades.find(trade => trade.id === id);
    if (trade) {
        trade.name = newTrade.name;
        trade.price = newTrade.price;
        trade.imageLink = newTrade.imageLink;
        trade.description = newTrade.description;
        trade.category = newTrade.category;
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