const express = require('express');
const morgan = require('morgan');
const methodoverride = require('method-override');

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

app.listen(port, host, () => console.log('server is running on', port));
