const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const express = require('express')
const helmet = require('helmet')
const hbs = require('hbs')
const validator = require('validator')


const app = express()


//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//define handlebars config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//turn on helmet and set static dir
app.use(helmet())
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Stew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Stew'
    })
} )

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Stew',
        message: 'Welcome to the help screen'
    })
} )

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }


    geocode(validator.escape(req.query.address), (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
            forecast: forecastData.summary + ' It is currently ' + forecastData.temp + ' degrees with a ' + forecastData.pricipPossible + '% chance of rain.',
            location,
            searchTerm: validator.escape(req.query.address)
            })
          })
    })
    })

// app.get('/products', (req, res) => {
//     if (!req.query.search){
//         return res.send({
//             error: 'No search term provided'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page not found',
        name: 'Stew',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Stew',
        message: 'This is a 404 page'
    })
})

//airmonster.com
//airmonster.com/help
//app.com/about

app.listen(3000, "127.0.0.1", () => {
    console.log('Server up and running on port 3000')
})