const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

/**
 * Route to create a new task
 */
router.post('/', tasksController.createTask);

router.get('/', tasksController.getAllTasks);

router.get('/:taskId', tasksController.getTaskById);

router.put('/:taskId', tasksController.updateTaskStatus);

router.delete('/:taskId', tasksController.deleteTask);

module.exports = router;
