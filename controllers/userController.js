// filepath: /Users/abdullahiqbal/Documents/portfolio-website/backend/controllers/userController.js
const User = require('../models/userModel');

// Fetch all users with their referenced data
const getUsers = async (req, res) => {
  try {
    console.log('Fetching users from database...');
    const users = await User.find({},{name:1,title:1,bio:1,email:1,phone:1});
    console.log('Users fetched:', users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
};