//Core package
const path = require('path')

//NPM packages
const express = require('express')
const hbs = require('hbs')

//My packages
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static location to serve
app.use(express.static(publicDirectoryPath))

//Home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aristidis Kantas'
    })
})

//About page
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Aristidis Kantas'
    })
})

//Help page
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Aristidis Kantas',
        helpText: 'This is some very helpfull text!'
    })
})

//Weather page
app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address

    geocode(address, (error,{latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            return res.send({
                location: location,
                address: address,
                forecastData: forecastData,

            })
        })
    })
    
})

//Products page
app.get('/Products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//404 page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Aris Kantas',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
        res.render('404', {
            title: 'Error 404',
            name: 'Aris Kantas',
            errorMessage: 'Page not found'
        })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})