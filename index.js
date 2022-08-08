const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config();


const app = express()
var fs = require('fs');
const port = process.env.port    //Define port 
const url = process.env.db_url
app.set('view engine', ejs)
app.use(bodyParser.urlencoded({extends: false}))


// mongoose.connect(url, {useNewUrlParser : true})
mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {});
const con = mongoose.connection

// mongoose connection stay on
con.on('open', ()=>{
    console.log('connect')
})

// start express server
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

app.use(express.json())  //to send json respose
app.set('view engine', 'ejs')

const view = require(path.join(__dirname,'/route/view'))
app.use('/', view)


const song = require(path.join(__dirname,'/route/song'))
app.use('/song', song)

const artist = require(path.join(__dirname,'/route/artist'))
app.use('/artist', artist)

const user = require(path.join(__dirname,'/route/user'))
app.use('/user', user)


