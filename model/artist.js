const mongoose = require('mongoose')

const artist = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    Dob : {
        type : String,
        required : true
    },
    Bio : {
        type : String,
        required : true
    },
    songs : {
        type : [String],
        required : false
    },
    avgRating : {
        type : Number,
        required : false,
        default : 0 
    },
    ratingCount: {
        type: Number,
        required : false,
        default : 0
    },
    ratingSum : {
        type: Number,
        required : false,
        default : 0
    }
})

module.exports = mongoose.model('artists', artist)