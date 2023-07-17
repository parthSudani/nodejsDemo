const Project = require('../models/Project');
const User = require('../models/User');

/**
 * Create a new project
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.createProject = async (req, res) => {
  try {
    const { name, manager, developers } = req.body;
    const existingManager = await User.findById(manager);
    if (!existingManager) {
      return res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "Manager not found" } });
    }
    const existingDevelopers = await User.find({ _id: { $in: developers } });
    if (existingDevelopers.length !== developers.length) {
      return res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "One or more developers not found" } });
    }
    const project = new Project({
      name,
      manager,
      developers
    });
    await project.save();
    res.status(201).json({ code: 201, message: "Project created successfully", data: project, error: {} });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};

/**
 * Get all projects
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('manager developers');
    res.json(projects);
    res.status(200).json({ code: 200, message: "Project Get successfully", data: projects, error: {} });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};

/**
 * Get a specific project by ID
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('manager developers');
    if (!project) {
      return res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "Project not found" } });
    }
    res.status(200).json({ code: 200, message: "Project Get ny id successfully", data: project, error: {} });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};


/**
 * Update a project
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, manager, developers } = req.body;

    // Check if the manager and developers exist
    const existingManager = await User.findById(manager);
    if (!existingManager) {
      return res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "Manager not found" } });
    }
    const existingDevelopers = await User.find({ _id: { $in: developers } });
    if (existingDevelopers.length !== developers.length) {
      return res.status(400).json({ code: 500, message: "Something went wrong while delete project", data: {}, error: { message: "One or more developers not found" } });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, manager, developers },
      { new: true }
    ).populate('manager developers');

    if (!updatedProject) {
      res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "Project not found" } });
    }

    res.status(201).json({ code: 201, message: "Project update successfully", data: updatedProject, error: {} });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};

/**
 * Delete a project
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.deleteOne({ _id: projectId });
    console.log("---------- dele", deletedProject);
    if (!deletedProject) {
      return res.status(400).json({ code: 404, message: "Something went wrong while delete project", data: {}, error: { message: "Project not found" } });
    }
    res.status(201).json({ code: 201, message: "Project Delete successfully", data: deletedProject, error: {} });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Something went wrong while delete project", data: {}, error: { message: error.message } });
  }
};
