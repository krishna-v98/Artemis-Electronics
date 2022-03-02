const express = require('express');
const morgan = require('morgan');
const methodoverride = require('method-override');
const tradeRoutes = require('./routes/tradeRoutes');


const app = express();

const port = 3000;
const host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use(methodoverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

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
    res.render('error', { error: err });
});

app.listen(port, host, () => console.log('server is running on', port));
