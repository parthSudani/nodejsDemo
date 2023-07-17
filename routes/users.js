const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')
/**
 * Route to create a new user
 */
router.post('/', userController.createUser);

router.get('/', userController.GetUser);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.get('/:id', userController.deleteUser);

// ... other user routes

module.exports = router;
