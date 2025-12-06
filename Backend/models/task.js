const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
    },
    Start:{
        type:String,
    },
    End:{
        type:String,
    },
    Categories:[

    ],
    Color:{
        type:String
    },
    State:{
        type:Number,
        required:true,
        default:0
    },
    ReminderSent:{
        type:Boolean,
    }
},{timestamps:true});

const taskModel=mongoose.model('task',taskSchema);
module.exports=taskModel;