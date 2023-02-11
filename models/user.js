const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    middle_name:{
        type:String,
       
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'USER'
    },
    department:{
        type:String
    }
},{
    timestamps:true
});
    
module.exports = mongoose.model("User",userSchema);