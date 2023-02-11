const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/user');

const verifyToken = (req,res,next)=>{
let token = req.headers.authorization;
if(token){
    token = token.split(" ")[1];
    jwt.verify(token,process.env.SECRET,(err,payload)=>{
        if(err){
        return res.status(401).json({ error: "you must be logged in" });
        }
        const {_id} = payload;
        User.findById(_id).then((userdata)=>{
            req.user = userdata;
            next();
        })
    })

}else{
    return res.status(401).json({ error: "unauthorized User" });
}

}

const isAdmin = (req,res,next)=>{
    if(req.user.role === 'ADMIN'){
        next()
    }else{
        return res.status(400).json({error:'You are not an admin'})
    }
}

const isUser = (req,res,next)=>{
    if(req.user.role === 'USER'){
        next();
    }else{
        return res.status(400).json({error:'You are not an admin'})
    }
}


module.exports = {verifyToken,isAdmin,isUser};