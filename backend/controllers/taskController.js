const task=require('../models/task.model.js');

const createTask=async(req,res)=>{
    try{
    const {title,description,status,assignedTo}=req.body;
    const newTask=new task({title,description,status,assignedTo});
    await newTask.save();
    res.status(201).json({message:"Task created successfully",task:newTask});}
    catch(err){
        console.error('Create task error:',err);
        res.status(500).json({message:"Server error"});
    }
}
const getTasks=async(req,res)=>{
    try{
    const tasks=await task.find().populate('assignedTo','username email');  
    res.status(200).json(tasks);}
    catch(err){
        console.error('Get tasks error:',err);
        res.status(500).json({message:"Server error"});
    }
}
const updateTasks=async(req,res)=>{
    const {id}=req.params
    try{
        const updated=await task.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated);
    }
    catch(error){
        res.status(500).json({message:"Update Failed"})
    }
}
const deleteTasks=async(req,res)=>{
    const {id}=req.params
    try{
        const deleted=await task.findByIdAndDelete(id,req.body)
        res.status(200).json(deleted)
    }
    catch(error){
        res.status(500).json({message:"Deletion Failed"})
    }
}
module.exports={createTask,getTasks,updateTasks,deleteTasks};