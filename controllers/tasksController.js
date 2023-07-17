const Task = require('../models/Task');
const User = require('../models/User');
const Project = require('../models/Project');

/**
 * Create a new task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.createTask = async (req, res) => {
  try {
    const { name, assignedTo, projectId } = req.body;

    /**
     * Check if the assigned user and project exist
     */
    const existingUser = await User.findById(assignedTo);
    if (!existingUser) {
      return res.status(404).json({ code: 404, message: "Something went wrong while create task", data: {}, error: { message: "Assigned user not found" } });
    }
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ code: 404, message: "Something went wrong while create task", data: {}, error: { message: "Project not found" } });
    }

    const task = new Task({
      name,
      assignedTo,
      project: projectId
    });

    await task.save();
    existingProject.tasks.push(task._id);
    await existingProject.save();
    res.status(201).json({ code: 201, message: "Task create successfully", data: task, error: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while create task", data: {}, error: { message: error.message } });
  }
};

/**
 * Get all tasks
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo project');
    res.status(200).json({ code: 200, message: "Task Get successfully", data: tasks, error: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get task list", data: {}, error: { message: error.message } });
  }
};

/**
 * Get a specific task by ID
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).populate('assignedTo project');
    if (!task) {
      return res.status(404).json({ code: 404, message: "Something went wrong while get by id task", data: {}, error: { message: "Task not found" } });
    }
    res.status(200).json({ code: 200, message: "Task get by id successfully", data: task, error: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get by id task", data: {}, error: { message: error.message } });
  }
};

/**
 * Update the status of a task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!['TODO', 'IN PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ code: 404, message: "Something went wrong while update task", data: {}, error: { message: "Invalid task status" } });
    }

    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) {
      return res.status(404).json({ code: 404, message: "Something went wrong while get by id task", data: {}, error: { message: "Task not found" } });
    }
    res.status(201).json({ code: 201, message: "Task update successfully", data: task, error: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while update task", data: {}, error: { message: error.message } });
  }
};

/**
 * Delete a task
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ code: 404, message: "Something went wrong while get by id task", data: {}, error: { message: "Task not found" } });
    }

    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ code: 404, message: "Something went wrong while create user", data: {}, error: { message: "Project not found" } });
    }

    project.tasks.pull(task._id);
    await project.save();
    await task.remove();
    res.status(200).json({ code: 200, message: "Task update successfully", data: {}, error: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while delete task", data: {}, error: { message: error.message } });
  }
};
