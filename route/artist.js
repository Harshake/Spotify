const express = require('express')
const path = require('path')

const router = express.Router()
const artistSchema = require(path.join(__dirname, '../model/artist'))


router.get('/', async(req,res)=>{
    try {
        const artist = await artistSchema.find().sort({"name":1})
        res.render(path.join(__dirname,'../frontend/view/artist.ejs'), {artist})
    } catch (error) {
        res.send("error")
    }
})

router.get('/addArtist', async(req,res)=>{
    try {
        res.render(path.join(__dirname,'../frontend/view/addArtist.ejs'))
    } catch (error) {
        res.send("error")
    }
})

router.post('/addArtist', async(req,res)=>{
    const data = new artistSchema({
        name: req.body.name,
        Dob: req.body.dob,
        Bio: req.body.bio
    })

    try {
        data.save()
        res.render(path.join(__dirname,'../frontend/view/addArtist.ejs'))
    } catch (error) {
        res.send("error")
    }
})

module.exports = router