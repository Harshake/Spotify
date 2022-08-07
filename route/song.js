const express = require('express')
const path = require('path')

const router = express.Router()
const songSchema = require(path.join(__dirname, '../model/song'))
const cloudinary = require(path.join(__dirname,'../utils/cloudinary'))
const upload = require(path.join(__dirname,'../utils/multer'))
const artistSchema = require(path.join(__dirname, '../model/artist'))



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
        res.render(path.join(__dirname,'../frontend/view/addSong.ejs'))
    } catch (error) {
        res.send("error")
    }
})

router.post('/addSong', upload.single("image"), async(req,res)=>{

    // res.send(req.body)
    const file = req.files.cover
    cloudinary.uploder.upload(file.tempFilePath, (err, result)=>{
        res.send(result)
    })
    // try {
    // const result = await cloudinary.uploader.upload(req.file.cover);
    // console.log(result)
    // const data = new songSchema({
    //     name: req.body.name,
    //     dateOfRelease: req.body.dor,
    //     artist: req.body.artist,
    //     cover : result.secure_url,
    //     cloudinary_id : cloudinary_id

    // })
    //    await data.save()
    //    res.render(path.join(__dirname,'../frontend/view/addSong.ejs'))
    // } catch (error) {
    //     res.send("error")
    // }
})

module.exports = router