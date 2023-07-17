const express = require('express');
const router = express.Router();
const projectCOntroller = require('../controllers/projectsController')

/**
 * Route to create a new project
 */
router.post('/', projectCOntroller.createProject);

router.get('/', projectCOntroller.getAllProjects);

router.get('/:id', projectCOntroller.getProjectById);

router.put('/:id', projectCOntroller.updateProject);

router.delete('/:id', projectCOntroller.deleteProject);

module.exports = router;
