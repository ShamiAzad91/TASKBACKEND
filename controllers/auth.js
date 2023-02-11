const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');


exports.signup = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
        const {first_name,middle_name,last_name,email,password,department} = req.body;
        if(!first_name || !last_name || !email||!password ||!department)
        return res.status(422).json({error:"Plz include all the fields",status:"failed"});

        const userExist = await User.findOne({email:email});
        if(userExist)
        return res.status(400).json({error:"User already registerd",status:"failed"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = new User({
            first_name,
            middle_name,
            last_name,
            email,
            password:hashedPassword,
            department

        });

        let result = await user.save();

        result.password = undefined

        if(!result)
        return res.status(400).json({error:"Unable to registered user",status:"failed"});
        return res.status(200).json({user:result,message:"successfully user registered ",status:"success"});

    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
    }
}

exports.signin = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try{
        const {email,password} = req.body;
        if(!email || !password)
        return res.status(422).json({error:"Plz include all the fields",status:"failed"});

        const userExist = await User.findOne({email:email});
        if(!userExist)
        return res.status(400).json({error:"user doesnot exist",status:"failed"});

        const verifiedPassword = await bcrypt.compare(req.body.password,userExist.password);
        if(!verifiedPassword)
        return res.status(400).json({error:"invalid credentials",status:"failed"});
        userExist.password = undefined;

        const token = jwt.sign({_id:userExist._id},process.env.SECRET,{expiresIn:"2h"});

        return res.status(200).json({user:userExist,auth:token,message:"successfully user login ",status:"success"});

    }catch(err){
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
    }
}