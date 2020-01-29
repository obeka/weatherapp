const form = document.querySelector('#searchForm');
const temp = document.querySelector('#temp');
const forecast = document.querySelector('#forecast');
const city = document.querySelector('#city');
const max = document.querySelector('#max');
const min = document.querySelector('#min');
const img1 = document.querySelector('.img1')
const img2 = document.querySelector('.img2')

form.addEventListener('submit', e => {
    e.preventDefault();

    let searchTerm = form.search.value.toLowerCase().trim();

    fetch(`/weather?address=${searchTerm}`).then(response => {
        response.json().then( forecastData => {
            if(forecastData.err) {
                alert(forecastData.err)
            } else {
                img2.setAttribute('src', `/img/${forecastData.data.currently.icon}.svg`)
                temp.innerHTML = `${forecastData.data.currently.temperature} `;
                forecast.textContent = forecastData.data.currently.summary;
                city.textContent = `${forecastData.location_text}, ${forecastData.location_country}`;
                max.textContent = `Max: ${forecastData.data.daily.data[0].temperatureMax}`;
                min.textContent = `Min: ${forecastData.data.daily.data[0].temperatureMin}`;
        
                if(forecastData.data.currently.time > forecastData.data.daily.data[0].sunriseTime && forecastData.data.currently.time < forecastData.data.daily.data[0].sunsetTime) {
                    img1.setAttribute('src', 'img/daytime/day.png')
                } else {
                    img1.setAttribute('src', 'img/daytime/night.png')
                }
            }
        })
    });

    form.reset();

});
