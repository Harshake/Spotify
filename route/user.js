const express = require('express')
const path = require('path')

const router = express.Router()
const userSchema = require(path.join(__dirname, '../model/user'))

router.get('/', async(req,res)=>{
    try {
        const user = await userSchema.find()
        res.json(user)
    } catch (error) {
        res.send("error")
    }
})

module.exports = router