const express = require('express')
const path = require('path')

const router = express.Router()
const songSchema = require(path.join(__dirname, '../model/song'))
const artistSchema = require(path.join(__dirname, '../model/artist'))

router.get('/', async(req,res)=>{
     const song = await songSchema.find().sort({'name': -1}).lean().exec()
     const artist = await artistSchema.find().lean().exec()
     res.render(path.join(__dirname,'../frontend/view/index'),{song, artist})
})

module.exports = router