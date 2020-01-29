//Utils functions
const geocode = require('./utils/map');
const forecast = require('./utils/forecast');
//Inıtıalızıng the express and hbs
const express = require('express');
const app = express();
const hbs = require('hbs');
app.set('view engine', 'hbs');

// paths
const path = require('path')
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index')
});

app.get('/weather', (req, res) => {
        geocode(req.query.address, (err, mapData) => {
            if (err) {
               return res.send({err})
            } else {
                forecast(mapData.lat, mapData.long, mapData.location_text, mapData.location_country, (err, data) => {
                    if (err) {
                        return res.send({err})
                    } else {
                        res.send(data)
                    }
                });
            }
        });
});



app.listen('3000', () => {
    console.log('Connected to the server 3000.')
})