const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location    
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Andrew Mead'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Andrew Mead'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help page',
        name : 'Andrew Meat'
    })
})

// app.get('',(req,res) => {
//     res.send('Hello Express!')
// })

 
// app.get('/help',(req,res) => {
//     res.send([{
//         name : "Andrew",
//         age : 23
//     },{
//         name: 'Gupta',
//         age : 27
//     }])
// })


// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })

// query parameter

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide with a search term'
        })
    }
    res.send(
        {
            product : []
        }
    )
})

// app.get('/weather', (req,res) => {
//     res.send({
//         forecast : 'It is snowing',
//         loaction : 'Philadelphia'
//     })
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide with an address'
        })
    }

    geocode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })

    // res.send({
    //     forecast : 'It is snowing',
    //     loaction : 'Philadelphia',
    //     address : req.query.address
    // })
})

// error page 404

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Andrew Meat',
        errorMessage : 'Help article not found'
       
})
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Angrew Mead',
        errorMessage :  'Page not found'
    })
})


app.listen(port,() => {
    console.log('Server is up on port '+port+'.')
})
