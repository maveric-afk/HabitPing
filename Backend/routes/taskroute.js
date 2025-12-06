const express=require('express');
const {handleAddNewTask,handleGetAllTasks}=require('../controllers/task')
const router=express.Router();

router.post('/addnew',handleAddNewTask)
router.get('/all',handleGetAllTasks);

module.exports=router;