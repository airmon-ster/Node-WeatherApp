const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/{CHANGED}/' + latitude + ',' + longitude + '?units=us'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                pricipPossible: body.currently.precipProbability
            })
    }
})
}



module.exports = forecast
