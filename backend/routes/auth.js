const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const {User} = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto')


const transport = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))


//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

router.post('/signup' , (req,res) => {
    const {name,email,password,pic} = req.body;

    if(!email || !password || !name)
    {
        return res.status(422).json({error:"please add all fields !"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error:"user already exists!"})
        }
        bcrypt.hash(password , 12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic:pic
            })
    
            user.save()
            .then(user => {
                transport.sendMail({
                    to:user.email,
                    from:"no-reply@insta.com",
                    subject:"signup success!",
                    html:"<h1>Welcome to Instagram!</h1>"
                })
                res.json({message:"saved successfully!"})
            })
            .catch(err => {
                console.log(err)
            })
        })
       
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin',(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(422).json({error:"Please Provide email and password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password!"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message:"Successfully Signed In!"})
                const token = jwt.sign({_id:savedUser._id},"sahilkr26244")
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password!"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(422).json({error:"User dont exists with that email!"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transport.sendMail({
                    to:user.email,
                    from:"no-reply@insta.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password</p>
                    <h5>Click on this <a href='http://localhost:3000/reset/${token}' >link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email!"})
            })
        })
    })
})

router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user => {
        if(!user){
            return res.status(422).json({error:"Try again session gets expired!"})

        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken  = undefined
            user.save().then((savedUser) => {
                res.json({message:"Password Updated Successfully!!"})
            })
        })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router