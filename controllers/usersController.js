const User = require('../models/User');

/**
 * Creat user
 * @param {Object} req 
 * @param {Object} res 
 */
exports.createUser = async (req, res) => {
  try {
    const { name, role, createrRole } = req.body;
    if (createrRole == "Admin" || createrRole == "" || createrRole == undefined) {
      if (createrRole == "Admin" && role == "Manager" || role == "Developer") {
        const user = new User({
          name,
          role,
          createrRole
        });
        await user.save();
        res.status(201).json({ code: 201, message: "User created successfully", data: user, error: {} });
      } else {
        res.status(400).json({ code: 400, message: "Something went wrong while create user", data: {}, error: { message: "You can not create user, Only admin can access to create manager and developer" } });
      }
    } else if (createrRole == "" && role == "Admin") {
      const user = new User({
        name,
        role,
        createrRole
      });
      await user.save();
      res.status(201).json({ code: 201, message: "User created successfully", data: user, error: {} });
    }
  } catch (error) {
    res.status(500).json({ code: 400, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};

/**
 * Get user list
 * @param {Object} req 
 * @param {Object} res 
 */
exports.GetUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ code: 201, message: "Get user successfully", data: users, error: {} });
  } catch (error) {
    res.status(500).json({ code: 400, message: "Something went wrong while get user list", data: {}, error: { message: error.message } });
  }
};

/**
 * Get user by id
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ code: 404, message: "Something went wrong while get user by id user", data: {}, error: { message: 'User not found' } });
    } else {
      res.status(200).json({ code: 201, message: "Get user by id successfully", data: user, error: {} });
    }
  } catch (error) {
    res.status(500).json({ code: 400, message: "Something went wrong while get user by id", data: {}, error: { message: error.message } });
  }
};

/**
 * Update user
 * @param {Object} req 
 * @param {Object} res 
 */
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, role },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ code: 404, message: "Something went wrong while update user", data: {}, error: { message: 'User not found' } });
    } else {
      res.status(201).json({ code: 201, message: "Update user successfully", data: updatedUser, error: {} });
    }

  } catch (error) {
    res.status(500).json({ code: 400, message: "Something went wrong while update user", data: {}, error: { message: error.message } });
  }
};

/**
 * Delete user
 * @param {Object} req 
 * @param {Object} res 
 */
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ code: 404, message: "Something went wrong while delete user", data: {}, error: { message: 'User not found' } });
    }
    res.status(201).json({ code: 201, message: "User deleted successfully", data: deletedUser, error: {} });
  } catch (error) {
    res.status(500).json({ code: 400, message: "Something went wrong while delete user", data: {}, error: { message: error.message } });
  }
};