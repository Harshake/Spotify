const mongoose = require('mongoose')

const user = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    songs : {
        type : [String],
        required : true
    }
})

module.exports = mongoose.model('users', user)