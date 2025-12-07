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
        Color:body.color,
        CreatedBy:user.Id
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


async function handleEditTask(req,res) {
    const {title,desc}=req.body;
    const taskId=req.params?.id;
    if(title!="")
    await taskModel.updateOne({_id:taskId},{$set:{Title:title}});

    if(desc!="")
    await taskModel.updateOne({_id:taskId},{$set:{Description:desc}});

    const taskData=await taskModel.find({_id:taskId});
    return res.json({success:'Task Edited',newtitle:taskData[0].Title,newdesc:taskData[0].Description});
}

async function handleDeleteTask(req,res) {
    const id=req.params?.id;
    const token=req.cookies?.token;
    const user=getUser(token);
    await taskModel.deleteOne({_id:id});
    await userModel.updateOne({_id:user.Id},{$pull:{Tasks:id}});
    return res.json({success:"Deleted"});
}


async function handleMarkTask(req,res) {
    const taskId=req.params?.id;
    const token=req.cookies?.token;
    const user=getUser(token);
    await taskModel.updateOne({_id:taskId},{$set:{State:1}});

    await userModel.updateOne({_id:user.Id},{$inc:{Points:5}});
    return res.json({success:"Marked as complete"});
}

async function handleUnMarkTask(req,res) {
     const taskId=req.params?.id;
     const token=req.cookies?.token;
    const user=getUser(token);

    await taskModel.updateOne({_id:taskId},{$set:{State:0}});
    await userModel.updateOne({_id:user.Id},{$inc:{Points:-5}});
    return res.end();
}

async function handleMarkTaskDelay(taskId,userId) {
    await taskModel.updateOne({_id:taskId},{$set:{State:2}});
    await userModel.updateOne({_id:userId},{$inc:{Points:-2}});
    return;
}

module.exports={
    handleAddNewTask,handleGetAllTasks,handleEditTask,handleDeleteTask,handleMarkTask,handleUnMarkTask,handleMarkTaskDelay
}