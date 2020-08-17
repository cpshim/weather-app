var express = require('express');
var router = express.Router();
var cors = require('cors');
var fetch = require('node-fetch');

require('dotenv').config()

router.get('/:city', cors(), async (req, res, next) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API_KEY}`,
        { mode: "cors" }
    );
    const weatherData = await response.json();
    res.json(weatherData);
});

router.get('/detailed/:lat&:lon', cors(), async (req, res, next) => {
    const detailedData = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&exclude=minutely&appid=${process.env.API_KEY}`,
        { mode: "cors" }
    );
    const detailedWeatherData = await detailedData.json();
    res.json(detailedWeatherData);
});

module.exports = router;