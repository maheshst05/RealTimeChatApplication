const express = require('express');
const userRoute = express.Router()
const{userModel} = require('../Model/userModel')
const bcrypt = require("bcrypt");

userRoute.post("/register",async(req,res)=>{
    const{username,email,password,isAvatarImageSet,avatarImage} = req.body;
    try {
    const user = await userModel.find({username})
    if(user.length>0){
        return res.json({ msg: "Username already used", status: false });
    }else{
        bcrypt.hash(password, 5,async function(err, hash) {

            const newuser = new userModel({username,email,password:hash,isAvatarImageSet,avatarImage}) 
            await newuser.save()
            return res.json({ status: true, user });
        }); 
    }    
    } catch (error) {
        
    }
})

userRoute.post("/login",async(req,res)=>{
    const {username, password}= req.body;
    try {
        const user = await userModel.find({username})

        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    return res.json({ status: true, user });
            } 
       else {
        return res.json({ msg: "Incorrect Username or Password", status: false });
    }
      });
        }
        else{
            res.send({"msg":"User not found"})
        }
    }catch (error) {
        
    }
})

module.exports = {
    userRoute
}