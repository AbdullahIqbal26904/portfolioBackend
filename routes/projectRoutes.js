const express = require('express');
const { addProject,getProject } = require('../controllers/projectController');
const router = express.Router();
const upload = require('../middleware/upload');

// Route to fetch all skills of a user
router.post('/addProject', upload.single('live_demo'), addProject);
router.get('/:id', getProject);

module.exports = router;
