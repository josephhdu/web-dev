

function searchWeather(){
    let location = document.getElementById("locationInput").value

    console.log(location)

    let cloudCover, humidity, precipitationProb, rainIntensity, sleetIntensity, snowIntensity, temperature, apparentTemp, weatherCode, windGust, windSpeed, latitude, longitude

    const options = {method: 'GET', headers: {accept: 'application/json'}};
    fetch('https://api.tomorrow.io/v4/weather/realtime?location='+ location +'&units=metric&apikey=3SJ799mNgWXZjxtUT70PIUyLt9AMN0Qz', options)
    .then(response => response.json())
    .then(response => {

        latitude = response.location.lat
        longitude = response.location.lon
        console.log(latitude)
        console.log(longitude)
        getTime(latitude, longitude)


        cloudCover = response.data.values.cloudCover
        humidity = response.data.values.humidity
        precipitationProb = response.data.values.precipitationProbability
        rainIntensity = response.data.values.rainIntensity
        sleetIntensity = response.data.values.sleetIntensity
        snowIntensity = response.data.values.snowIntensity
        temperature = Math.round(response.data.values.temperature)
        apparentTemperature = Math.round(response.data.values.temperatureApparent)
        weatherCode = response.data.values.weatherCode
        windGust = response.data.values.windGust
        windSpeed = response.data.values.windSpeed


        if(weatherCode == 1000){
            document.getElementById('weather').innerHTML = 'Clear'
            document.getElementById('weatherPicture').src = 'weatherIcons/clear.jpg'
        } else if(weatherCode == 1100){
            document.getElementById('weather').innerHTML = 'Mostly Clear'
            document.getElementById('weatherPicture').src = 'weatherIcons/partlyCloudy.jpg'
        } else if(weatherCode == 1101){
            document.getElementById('weather').innerHTML = 'Partly Cloudy'
            document.getElementById('weatherPicture').src = 'weatherIcons/partlyCloudy.jpg'
        } else if(weatherCode == 1102){
            document.getElementById('weather').innerHTML = 'Mostly Cloudy'
            document.getElementById('weatherPicture').src = 'weatherIcons/mostlycloudy.jpg'
        } else if(weatherCode == 1001){
            document.getElementById('weather').innerHTML = 'Cloudy'
            document.getElementById('weatherPicture').src = 'weatherIcons/cloudy.jpg'
        } else if(weatherCode == 2000 || 2100){
            document.getElementById('weather').innerHTML = 'Fog'
            document.getElementById('weatherPicture').src = 'weatherIcons/foggy.jpg'
        } else if(weatherCode == 4000){
            document.getElementById('weather').innerHTML = 'Drizzle'
            document.getElementById('weatherPicture').src = 'weatherIcons/drizzle.jpg'
        } else if(weatherCode == 4001){
            document.getElementById('weather').innerHTML = 'Rain'
            document.getElementById('weatherPicture').src = 'weatherIcons/rain.jpg'
        } else if(weatherCode == 4200){
            document.getElementById('weather').innerHTML = 'Light Rain'
            document.getElementById('weatherPicture').src = 'weatherIcons/drizzle.jpg'
        } else if(weatherCode == 4201){
            document.getElementById('weather').innerHTML = 'Heavy Rain'
            document.getElementById('weatherPicture').src = 'weatherIcons/heavyRain.jpg'
        } else if(weatherCode == 5000){
            document.getElementById('weather').innerHTML = 'Snow'
            document.getElementById('weatherPicture').src = 'weatherIcons/snow.jpg'
        } else if(weatherCode == 5001){
            document.getElementById('weather').innerHTML = 'Flurries'
            document.getElementById('weatherPicture').src = 'weatherIcons/snow.jpg'
        } else if(weatherCode == 5100){
            document.getElementById('weather').innerHTML = 'Light Snow'
            document.getElementById('weatherPicture').src = 'weatherIcons/snow.jpg'
        } else if(weatherCode == 5101){
            document.getElementById('weather').innerHTML = 'Heavy Snow'
            document.getElementById('weatherPicture').src = 'weatherIcons/snow.jpg'
        } else if(weatherCode == 6000 || 6001 || 6200 || 6201 || 7000 || 7101 || 7102){
            document.getElementById('weather').innerHTML = 'Hail'
            document.getElementById('weatherPicture').src = 'weatherIcons/hail.jpg'
        } else if(weather == 8000){
            document.getElementById('weather').innerHTML = 'Thunderstorm'
            document.getElementById('weatherPicture').src = 'weatherIcons/thunderstorm.jpg'
        }

        document.getElementById('temperature').innerHTML = temperature + 'C'
        document.getElementById('apparentTemperature').innerHTML = 'feels like ' + apparentTemperature + 'C'
        document.getElementById('wind').innerHTML = 'Wind: ' + windSpeed + 'm/s'
        document.getElementById('windGust').innerHTML = 'Wind gust: ' + windGust + 'm/s'
        document.getElementById('humidity').innerHTML = 'Humidity: ' + humidity + '%'


        console.log('cloud cover % is ' + cloudCover + '%')
        console.log('humidity is ' + humidity + '%')
        console.log('precipitation probablit is ' + precipitationProb + '%')
        console.log('rain intensity is ' + rainIntensity + 'mm/hr')
        console.log('sleet intensity is ' + sleetIntensity)
        console.log('snow is ' + snowIntensity)
        console.log('temp is ' + temperature)
        console.log('apparent temperature is ' + apparentTemperature)
        console.log('weather code is' + weatherCode)
        console.log('wind gust ' + windGust)
        console.log('wind speed is ' + windSpeed)

        console.log(response)
    })
    .catch(err => console.error(err));

    var section = document.getElementById('weatherContainer');
    if (section.style.display === 'none') {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
    //document.getElementById("test").innerHTML = location
    //console.log('humidity is' + humidity + 'and the tempurature is' + temperature)

}


// cloud cover determines if the day is cloudy or not
// 100% tottaly cloudy
// 50% half cloudy
// 25% not too cloudy
// 0% clear skies

//rain intensity
// < 2.5mm = light rain
// 2.5mm - 7.6mm = mod rain
// 7.6mm - 50mm = heavy rain
// > 50mm = violent rain

//snow intensity
// < 1mm light snow
// 1 - 2.5mm = mod snow
// > 2.5mm heavy snow



function getTime(lat, long){
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    fetch('http://api.timezonedb.com/v2.1/get-time-zone?key=VWKF37BV1MG8&format=json&by=position&lat='+ lat + '&lng=' + long, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        document.getElementById('location').innerHTML = response.cityName + ', ' + response.regionName
    })
    .catch(err => console.error(err));
}