const request = require('request');
const mapKey = 'pk.eyJ1Ijoib21lcmJrazA2IiwiYSI6ImNrNThqeGRxbDBlcDIzam11eDIzaDRsamYifQ.P8GSW1O3dRj59x7v9l7FqA'

const geocode = (cityName, callback) => {
    const marURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?limit=1&access_token=${mapKey}`

    request( { url: marURL, json: true }, (err, response) => {
        if(err) {
            callback('Unable to connect to the mapping service. Please check your internet connection.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Poor search terms. Please check your search terms.', undefined)
        } else {
            callback(undefined, {
                lat : response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location_text: response.body.features[0].text,
                location_country: response.body.features[0].context[0].text
            });
        }
    });
}


module.exports = geocode







