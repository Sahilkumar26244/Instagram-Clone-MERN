const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const {User} = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

module.exports = router