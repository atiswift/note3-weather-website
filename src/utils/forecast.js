const request = require('request')

const forecast = (x,y,callback) => {

    url = 'http://api.weatherstack.com/current?access_key=90c7f06445ea5c11f66481dbd6da99b1&query='+encodeURIComponent(x)+','+encodeURIComponent(y)

    request({url, json:true}, (error,response) => {
         if(error){
             callback('Unable to connect to the local servies',undefined)
         }else if(response.body.current.length === 0){
             callback('Please try with other coordinates',undefined)
         }else{
            callback(undefined,response.body.current.weather_descriptions[0] +'. It is currently '+response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out. The humidity is " + response.body.current.humidity + "%.")
         }
    })

}

module.exports = forecast
