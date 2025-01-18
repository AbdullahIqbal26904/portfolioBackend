const express = require('express');
const { getSkills } = require('../controllers/skillController');
const router = express.Router();

// Route to fetch all skills of a user
router.get('/:id', getSkills);

module.exports = router;
