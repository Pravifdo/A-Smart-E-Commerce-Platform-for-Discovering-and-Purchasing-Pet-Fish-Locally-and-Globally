const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
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
    createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);