const express = require('express');
const morgan = require('morgan');
const methodoverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const tradeRoutes = require('./routes/tradeRoutes');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

const port = 3000;
const host = 'localhost';
const url = 'mongodb://localhost:27017/demos';
app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(url)
    .then(() => {
        app.listen(port, host, () => console.log('server is running on', port));
    })
    .catch(err => console.log(err.message));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodoverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', mainRoutes);

app.use('/trades', tradeRoutes);

app.use((req, res, next) => {
    let err = new Error('Seems like you lost your way!');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        err.message = ('Internal server error');
    }

    res.status(err.status);
    res.render('not-found', { error: err });
});

