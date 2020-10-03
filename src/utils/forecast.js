const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4548864485fa45aeb56a6f94b1b6b496&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + ''
    
    request({url, json: true}, (error, {body} = {}) => {
        
        if(error){
            callback('Unable to connect to weather services.', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 'The current weather is: ' + body.current.weather_descriptions[0] + '. ' + 'Temperature is ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degrees out. Humidity is: ' + body.current.humidity + '%' )
        }
    })

}

module.exports = forecast


