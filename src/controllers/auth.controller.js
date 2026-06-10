const express=require('express');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userModel=require('../models/user.models');


async function registerController(req,res){
    const {username,password}=req.body;
    const isUserExist=await userModel.findOne({
        username
    })
    if(isUserExist){
        return res.status(400).json({
            message:"this user is alredy exist"
        })
    }
    const user=await userModel.create({
       username,
       password:await bcrypt.hash(password,10)
    })
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);
    res.cookie("token",token);

    res.status(200).json({
        message:"user sucessfully created",
        user
    })

}
async function loginController(req,res){
    const {username,password}=req.body;
    const user=await userModel.findOne({
        username
    })
    const isPassword=await bcrypt.compare(password,user.password);
    if(!isPassword){
        return res.status(400).json({
            message:"password is invalid"
        })
    }
    res.status(200).json({
        message:"user sucessfully loggedin"
    })
}
module.exports={
    registerController,
    loginController
    
    
}