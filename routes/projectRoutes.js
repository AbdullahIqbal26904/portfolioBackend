const express = require('express');
const { addProject } = require('../controllers/projectController');
const router = express.Router();
const upload = require('../middleware/upload');

// Route to fetch all skills of a user
router.post('/addProject', upload.single('live_demo'), addProject);

module.exports = router;
