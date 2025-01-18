const mongoose = require('mongoose');
const User = require('../models/userModel');

const getSkills = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching skills from database...');
        const skills = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $unwind: "$skills"
            },
            {
                $project: {
                    skills: 1,
                    _id: 0
                }
            }
        ]);
        console.log('Skills fetched:', skills);
        res.json(skills.map(skill => skill.skills));
    } catch (err) {
        console.error('Error fetching skills:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getSkills,
};