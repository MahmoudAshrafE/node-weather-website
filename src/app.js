//The modules in the app
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forcast = require('./utils/forcast')
const geocoding = require('./utils/geocoding')


//create an express
const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views, partials location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud Ashraf Ennaba',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        src:'/image/author.jpg',
        name: 'Mahmoud Ashraf Ennaba',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help page',
        help:'contact with ...',
        name: 'Mahmoud Ashraf Ennaba',
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'Help article not found.',
        name: 'Mahmoud Ashraf Ennaba',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
        geocoding(req.query.address, (error, {latitude, longitude, location}) => {
            if (error) {
                return console.log(error);
            }
            forcast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log('Error: '+error);
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                })
            })
        
        })
    })

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: 'page not found.',
        name: 'Mahmoud Ashraf Ennaba',
    })
})

app.listen(port, () => {
    console.log('Your express is running in ' +port);
})