var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Home Page');
});

module.exports = router;