const express = require('express')
const path = require('path')

const router = express.Router()
const userSchema = require(path.join(__dirname, '../model/user'))

router.post('/', async (req, res) => {
    const data = new userSchema({
        _id: req.body.email,
        name: req.body.name
    })

    try {
        data.save()
        res.render(path.join(__dirname, '../frontend/view/user.ejs'))
    } catch (error) {
        res.send("error")
    }
})

router.get('/', async (req, res) => {
    try {
        res.render(path.join(__dirname, '../frontend/view/user.ejs'))
    } catch (error) {
        res.send("error")
    }
})

module.exports = router