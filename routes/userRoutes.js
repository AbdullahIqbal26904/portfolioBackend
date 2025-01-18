const express = require('express');
const { getUsers } = require('../controllers/userController');
const router = express.Router();
// const upload = require('../middleware/upload');

// Route to fetch all users
router.get('/', getUsers);

module.exports = router;
