const express=require('express');
const userModel=require('../models/user.models')
const jwt=require('jsonwebtoken')
const router=express.Router();

router.post('/register',async(req,res)=>{
    const {username,password}=req.body;

    const existingUser=await userModel.findOne({
        username
    });
    if(existingUser){
        return res.status(409).json({
            message:"this usernsme already exist"
        })
    }

    const user=await userModel.create({
        username,password
    })
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);
    res.cookie("token",token);
    
    res.status(201).json({
        message:"user created sucessfully",
        user
    })
    
})
module.exports=router;