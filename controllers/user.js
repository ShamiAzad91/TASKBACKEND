const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addUser = async(req,res)=>{
    try {
        const userConfirmPassword = await bcrypt.compare(req.body.userPassword,req.user.password);
        if(!userConfirmPassword)
        return res.status(400).json({error:"password donot match here",status:"failed"});

        //once password is confirm then user can add the another user
        const {first_name,middle_name,last_name,email,password,department} = req.body;
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
        result.password = undefined;
        if(!result)
        return res.status(400).json({error:"Unable to registered user",status:"failed"});
        return res.status(200).json({user:result,message:"successfully user registered ",status:"success"});
        
    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
    }

}

//update user
exports.updateUser = async(req,res)=>{
    try {
        
        let user = {};
        if(req.body.first_name){
            user.first_name = req.body.first_name
        }
        if(req.body.last_name){
            user.last_name = req.body.last_name
        }
        if(req.body.department){
            user.department = req.body.department
        }
     
        const id = req.params.id;
        let filter = {_id:id}

        let result = await User.findOneAndUpdate(filter,user,{new:true});
        if(!result)
        return res.status(400).json({error:"unable to update the user",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  updated the user",status:"success"});



        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}
// get all user details
exports.viewAllUser = async(req,res)=>{
    try {
        let result = await User.find()
        if(!result)
        return res.status(400).json({error:"unable to get the User details",status:"failed"});
        return res.status(200).json({result:result,message:"successfully  get the User",status:"success"});

        
    } catch (err) {
        return res.status(500).json({err:err.message,message:"Something went wrong",status:"failed"})
        
    }
}