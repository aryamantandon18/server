import express from 'express';
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleWares/auth.js';

export const router = express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);  