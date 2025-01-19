const mongoose = require('mongoose'); // Import Mongoose
const User = require('../models/userModel'); // Mongoose user model
const path = require('path');

const addProject = async (req, res) => {
    try {
        const { id, title, description, github_link, technologies, images } = req.body;

        console.log("Request Body:", req.body);

        // Validate required fields
        if (!id || !title || !description || !technologies) {
            console.error('Missing required fields');
            return res.status(400).json({ message: 'ID, title, description, and technologies are required' });
        }

        // Ensure technologies is an array
        const technologiesArray = Array.isArray(technologies)
            ? technologies
            : technologies.split(',').map(tech => tech.trim());

        console.log("Technologies Array:", technologiesArray);

        // Check if a video file is provided
        let live_demo = '';
        if (req.file) {
            const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
            const fileExtension = path.extname(req.file.originalname).toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).json({
                    message: `Invalid video format. Allowed formats are: ${allowedExtensions.join(', ')}`,
                });
            }

            live_demo = req.file.path; // Save the file path for the uploaded video
        }

        // Process images field
        const imagesArray = Array.isArray(images)
            ? images
            : images.split(',').map(img => img.trim());

        console.log("Images Array:", imagesArray);

        // Create a new project object
        const project = {
            title,
            description,
            technologies: technologiesArray,
            github_link,
            live_demo,
            images: imagesArray, // Use processed array
            date_created: new Date(), // Add current date
        };

        console.log("Project Object:", project);

        // Find user and update projects
        const user = await User.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id), // Find user by ID
            { $push: { projects: project } }, // Add the project to the projects array
            { new: true } // Return the updated document
        );

        // If no user is found
        if (!user) {
            console.error("User not found for ID:", id);
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user document
        res.status(200).json({
            message: 'Project added successfully',
            user,
        });
    } catch (err) {
        console.error('Error adding project:', err);

        // Respond with an error message
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getProject = async (req,res) => {
    try{
        const { id } = req.params;
        console.log('Fetching skills from database...');
        const projs = await User.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $unwind: "$projects"
            },
            {
                $project: {
                    projects: 1,
                    _id: 0
                }
            }
        ]);
        console.log('Projects fetched:', projs);
        res.json(projs);
    }catch(err){
        console.error('Error fetching skills:', err.message);
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    addProject,
    getProject,
};
