var express = require('express');
var router = express.Router();
var cors = require('cors');
var fetch = require('node-fetch');

require('dotenv').config()

router.get('/:city', cors(), async(req, res, next) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API_KEY}`,
        { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    res.json(weatherData);
});

module.exports = router;