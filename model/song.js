const mongoose = require('mongoose')

const song = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    dateOfRelease : {
        type : String,
        required : true
    },
    cover : {
        type : String,
        required : true
    },
    cloudinary_id : {
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