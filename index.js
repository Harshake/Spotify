const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const fileupload = require('express-fileupload')

dotenv.config();


const app = express()
const port = process.env.port    //Define port 
const url = process.env.db_url
app.set('view engine', ejs)
app.use(bodyParser.urlencoded({extends: true}))
app.use(fileupload({
    useTempFiles: true
}))



mongoose.connect(url, {useNewUrlParser : true})
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



