const mongoose = require('mongoose');
const User = require('../models/userModel');

const getEducation = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching skills from database...');
        const educ = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $unwind: "$education"
            },
            {
                $project: {
                    education: 1,
                    _id: 0
                }
            }
        ]);
        console.log('Education fetched:', educ);
        res.json(educ.map(educate => educate.education));
    } catch (err) {
        console.error('Error fetching skills:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getEducation,
};