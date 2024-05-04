const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    mobile:{
        type:Number
    }, 
},
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)