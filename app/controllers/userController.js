import User from "../models/userModel.js";
import md5 from "md5";


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const newUser = await User.create(req.body);
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    // If the request body contains only the password whe change the password
    if (req.body.password && Object.keys(req.body).length === 1) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { password: md5(req.body.password) },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      delete updatedUser.password;
      return res.status(200).json(updatedUser);
    } else {
      // else, whe change the body (example: you cant change the password and the name at the same time)
      if(req.body.password){
        delete req.body.password;
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      delete updatedUser.password;
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};