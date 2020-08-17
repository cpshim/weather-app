var express = require('express');
var path = require('path');

var searchRouter = require('./routes/search');

var app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/search', searchRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('testing port 5000');
});