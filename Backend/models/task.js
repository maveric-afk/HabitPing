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
    Category:{
        type:String,
        required:true,
        default:'Other'
    },
    Color:{
        type:String,
        required:true,
        default:'#fff'
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

// Health & Fitness

// Learning & Study

// Work & Productivity

// Self-Care & Wellness

// Home & Personal Life

// Finance & Money

// Social & Lifestyle

const taskModel=mongoose.model('task',taskSchema);
module.exports=taskModel;