const express = require('express');
const app = express();
const https = require('https');
const bodyParser =require('body-parser');
const ejs = require('ejs');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("index", {
    });
});

app.post('/', (req, res) => {
    const ville = req.body.ville;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=8af050a55453bb6e3907efbf714c77a2&units=metric";
    https.get(url, (response) => {

        response.on("data", (data) => {
            const tableau_weather = [];
            const meteo_data = JSON.parse(data)
            /* const temperature = meteo_data.main.temp
            const description = meteo_data.weather[0].description */
            const meteo = {
                city: ville,
                temperature: meteo_data.main.temp,
                description: meteo_data.weather[0].description,
                icon: meteo_data.weather[0].icon
            }
            tableau_weather.push(meteo)
            res.render('weather', { tableau: tableau_weather })
        })
    })
})

app.listen(3001, () => {
    console.log('Le serveur est lancé');
});