import ErrorHandler from "../middleWares/error.js";
import { Task } from "../models/task.js";

export const newTask=async(req,res,next)=>{
try {
    const {title,description} = req.body;
await Task.create({
    title,
    description,
    user:req.user,
})
res.status(201).json({
    success:true,
    message:"Task added successfully",
})
} catch (error) {
    next(error)
}
}

export const getMyTask = async(req,res)=>{
   try {  const userid = req.user._id;
    const tasks = await Task.find({user : userid });
    res.status(200).json({
       success:true,
       tasks,
    })
    
   } catch (error) {
    next(error)
   }
}

export const updateTask= async(req,res,next)=>{
try {
    const task = await Task.findById(req.params.id);
    if(!task){
        return next(new ErrorHandler("Task not found",404));
    } 

    task.isCompleted = !task.isCompleted;
    
    await task.save();                   //returns a promise 
    
    res.status(200).json({
        success:true,
        message:"Task updated",
     })
} catch (error) {
    next(error)
}
}
export const deleteTask= async(req,res,next)=>{
try {
    const task = await Task.findById(req.params.id);
    if (!task) {
        // Task not found, return a 404 response
        return next(new ErrorHandler("Task not found",404));
      }
    
    await task.deleteOne();  
    res.status(200).json({
        success:true,
        message:"Task deleted",
     })
} catch (error) {
    next(error)
}
}


 
// return res.status(404).json({
//     success: false,
//     message: "Task not found",
//   });