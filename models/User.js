const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        rquired:true
    },
    email:{
        type:String,
        rquired:true
    },
    password:{
        type:String,
        rquired:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User