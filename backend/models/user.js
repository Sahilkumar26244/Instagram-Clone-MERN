const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

const User = mongoose.model("User" , userSchema)

module.exports = {User}