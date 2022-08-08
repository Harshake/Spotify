const mongoose = require('mongoose')

const song = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    dateOfRelease : {
        type : String,
        required : true
    },
    cloudinaryId : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    artist : {
        type : [String],
        requierd : true
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

module.exports = mongoose.model('songs', song)