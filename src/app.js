const path  = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app =express()
//heroku port
const port = process.env.PORT || 3000
// define paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebats engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)

hbs.registerPartials(partialspath)

//set up static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res) => {
    res.render('index', {
        title:'weather app',
        name: 'Shivam mulewa'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'shivam mulewa'
    })
})
app.get('/help',(req,res)=>{
    res.render('help' ,{
        title:'help needed',
        name:'shivam mulewa'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address,(error, { latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })

    })
    // res.send({
    //     forecast:'It is snowing',
    //     location:'philadelhpia',
    //     address: req.query.address
    // })
})







app.get('/products',(req,res)=>{

    if(!req.query.search){
        return  res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

//* is wildcard when everythings a match
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 help',
        name:'shivam mulewa',
        errormessage:'help artice not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'shivam mulewa',
        errormessage: 'Page not found'

    })
})

app.listen(port,() => {
    console.log("server is up on port "+port)
})