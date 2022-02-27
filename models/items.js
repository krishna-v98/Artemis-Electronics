const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const trades =
{
    Laptops: [
        {
            id: 'a1',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'ROG Zephyrus G15',
            price: '$1800',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        },
        {
            id: 'a2',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'Apple Macbook Pro M1',
            price: '$2000',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        },
        {
            id: 'a3',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'Apple Macbook Pro M1 Max',
            price: '$2500',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        }
    ],
    Mobiles: [
        {
            id: 'b1',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'iPhone 13 Pro Max',
            price: '$1300',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        },
        {
            id: 'b2',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'iPhone 13 Pro ',
            price: '$1200',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        }
    ],
    Sound: [
        {
            id: 'c1',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'JBL Charge 5',
            price: '$180',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        },
        {
            id: 'c2',
            createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_MED),
            name: 'Bose Soundbar ',
            price: '$800',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt distinctio optio consequuntur voluptates, natus nemo tempora odit et quam at placeat suscipit corporis ullam adipisci iure maxime explicabo minus! Dolorem voluptas ab minima sapiente quidem sit perferendis, officiis culpa voluptates iusto numquam qui voluptatibus ea eum amet itaque, quod temporibus odit explicabo dolores tempora ad. Nam error aut odit perspiciatis.'
        }
    ]
};

exports.find = () => trades;