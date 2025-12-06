const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    NickName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'tasks'
        }
    ],
    Points:{
        type:Number,
        required:true,
        default:0
    },
    Rank:{
        type:String,
        required:true,
        default:"Ember"
    }
},{timestamps:true});

//Ember
//Apex
//Zenith
//Vortex
//Titan
//Eternis
//Pinnacle

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;