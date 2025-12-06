const userModel=require('../models/user')
const taskModel=require('../models/task');
const { getUser } = require('../authentication/auth');

async function handleAddNewTask(req,res) {
    const body=req.body;
    const token=req.cookies?.token;
    const user=getUser(token);

    const task=await taskModel.create({
        Title:body.title,
        Description:body.description,
        Start:body.startTime,
        End:body.endTime,
        Category:body.category,
        Color:body.color
    })

    await userModel.updateOne({_id:user.Id},{$push:{Tasks:task._id}})

    return res.json({success:'Added'})
}

async function handleGetAllTasks(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"});
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:"Not logged in"});
    }
    const allTasks=await taskModel.find({});
    return res.json({tasks:allTasks})
}

module.exports={
    handleAddNewTask,handleGetAllTasks
}