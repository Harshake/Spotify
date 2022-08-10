const express = require('express')
const path = require('path')

const router = express.Router()
const userSchema = require(path.join(__dirname, '../model/user'))
const songSchema = require(path.join(__dirname, '../model/song'))
const artistSchema = require(path.join(__dirname, '../model/artist'))

router.post('/', async (req, res) => {
    try {
        const user = await userSchema.find({ _id: req.body.email })
        var song = await songSchema.find()
        song = song[req.body.song]._id
        if (userSchema.findById({ _id: req.body.email })) {
            var addsong = user[0].songs
            addsong.forEach(e => {
                if (e == song) {
                    res.send("Already rated with this Email")
                }
            });
            addsong.push(song)
            await userSchema.updateOne({ _id: req.body.email }, {
                $set: {
                    songs: addsong
                }
            })
        }
        else {
            const data = new userSchema({
                _id: req.body.email,
                name: req.body.name,
                songs: req.body.song
            })
            data.save()
        }
            await userSchema.updateOne({ _id: req.body.email }, {
                $set: {
                    songs: song
                }
            })
        song = await songSchema.find({ _id: song })
        song[0].ratingSum += parseInt(req.body.rating)
        song[0].ratingCount++
        song[0].avgRating = song[0].ratingSum / song[0].ratingCount
        await songSchema.updateOne({ _id: song[0]._id }, {
            $set: {
                songs : song[0].songs,
                avgRating: song[0].avgRating,
                ratingCount: song[0].ratingCount,
                ratingSum: song[0].ratingSum
            }
        })
        for (let i = 0; i < song[0].artist.length; i++) {
            var artist = song[i].artist
            artist = await artistSchema.find({ _id: artist[i] })
            var temp = parseInt(req.body.rating)
            var ratingsum = artist[i].ratingSum
            artist[i].ratingSum = ratingsum + temp
            artist[i].ratingCount++
            artist[i].avgRating = artist[i].ratingSum / artist[i].ratingCount
            await artistSchema.updateOne({ _id: artist[i]._id }, {
                $set: {
                    avgRating: song[i].avgRating,
                    ratingCount: song[i].ratingCount,
                    ratingSum: song[i].ratingSum
                }
            })
        }
        res.send("Rate successfully")
    } catch (error) {
        res.send(error)
    }
})

router.get('/', async (req, res) => {
    const song = await songSchema.find()
    res.render(path.join(__dirname, '../frontend/view/user.ejs'), { song })
    try {
    } catch (error) {
        res.send("error")
    }
})

module.exports = router