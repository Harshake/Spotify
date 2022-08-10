const express = require('express')
const path = require('path')

const router = express.Router()
const songSchema = require(path.join(__dirname, '../model/song'))
const artistSchema = require(path.join(__dirname, '../model/artist'))
const cloudinary = require(path.join(__dirname,'../utils/cloudinary'))
const upload = require(path.join(__dirname,'../utils/multer'))


router.get('/', async(req,res)=>{
    try {
        const song = await songSchema.find().sort({"name":1})
        res.render(path.join(__dirname,'../frontend/view/song.ejs'), {song})
    } catch (error) {
        res.send("error")
    }
})

router.get('/addSong', async(req,res)=>{
    try {
        const artist = await artistSchema.find().sort({"name":1})
        res.render(path.join(__dirname,'../frontend/view/addSong.ejs'), {artist})
    } catch (error) {
        res.send("error")
    }
})

router.post('/addSong', upload.single("cover"), async(req,res)=>{
    try {
        var artist = await artistSchema.find().sort({"name":1})   
        const result = await cloudinary.uploader.upload(req.file.path);
        var art = []
        console.log(req.body)
        for (let index = 0, j = 0; index < artist.length; index++) {
            if(req.body.artists[j] == index){
            const element = artist[index]._id;
            art.push(element)
            j++
        }
        }
        var data = new songSchema({
            _id: req.body.name,
            dateOfRelease: req.body.dor,
            artist: art,
            url : result.secure_url,
            cloudinaryId : result.public_id
        })
           data.save()
        for (let index = 0; index < art.length; index++) {
            artist = await artistSchema.find({_id : art[index]})
            const add = req.body.name
            artist[0].songs.push(add)
            await artistSchema.updateOne({_id : art[index]},{
            $set :{
                songs : artist[0].songs
            }
        })
        }
           res.send("Song added succesfully")
        } catch (error) {
            res.send("error")
        } 
    })

module.exports = router