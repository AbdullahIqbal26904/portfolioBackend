const express = require('express');
const { getEducation } = require('../controllers/educationController');
const router = express.Router();

// Route to fetch all skills of a user
router.get('/:id', getEducation);

module.exports = router;
