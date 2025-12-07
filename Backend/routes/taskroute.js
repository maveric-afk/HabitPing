const express=require('express');
const {handleAddNewTask,handleGetAllTasks,handleEditTask,handleDeleteTask,handleMarkTask,handleUnMarkTask}=require('../controllers/task')
const router=express.Router();

router.post('/addnew',handleAddNewTask)
router.get('/all',handleGetAllTasks);

router.patch('/:id',handleEditTask);
router.patch('/mark/:id',handleMarkTask);
router.patch('/unmark/:id',handleUnMarkTask)

router.delete('/:id',handleDeleteTask);

module.exports=router;