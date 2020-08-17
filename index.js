var express = require('express');

var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');

var app = express();

app.use('/', homeRouter);
app.use('/search', searchRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('testing port 5000');
});