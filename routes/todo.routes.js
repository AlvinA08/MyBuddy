import express from 'express';
import todoController from '../controllers/todo.controller.js';
import { authMiddleware } from '../config/auth.config.js';

const router = express.Router();

// Add Task
router.post('/', authMiddleware, todoController.addTask.bind(todoController));

// Toggle Complete
router.patch('/:id/toggle', authMiddleware, todoController.toggleComplete.bind(todoController));

// Get All Tasks
router.get('/', authMiddleware, todoController.getAllTasks.bind(todoController));


export default router;
