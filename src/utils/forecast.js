const request = require('request');
const weatherKey = 'ebe209f9b17c03e0040a634f0700340e';

const forecast = (lat, long, location_text, location_country, callback) => {
    const weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${lat},${long}?units=si`
    request({
        url: weatherURL,
        json: true
    }, (err, response) => {
        if (err) {
            callback('Unable to connect to the weather service, check your internet connections.', undefined)
        } else if (response.body.error) {
            callback(response.body.error + `. Cehck your search terms.`, undefined)
        } else {
            callback(undefined, {
                data: response.body,
                location_text,
                location_country
            })
        }
    })
}

module.exports = forecast