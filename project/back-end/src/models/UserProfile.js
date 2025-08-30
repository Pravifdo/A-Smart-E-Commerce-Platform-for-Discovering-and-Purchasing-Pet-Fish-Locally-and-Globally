const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({

    userId:{
        type :String,
        required:true,
        unique:true
    },
    name :{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);