const mongoose = require('mongoose');

// Schema for Projects
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  github_link: String,
  live_demo: String,
  images: [String],
  date_created: Date,
});

// Schema for Skills
const skillSchema = new mongoose.Schema({
  name: String,
  proficiency: Number,
  category: String,
  skillimage: String,
});

// Schema for Education
const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year_of_start: Number,
  year_of_passing: Number,
  details: String,
  instituteimage: String,
});

// Schema for Experience
const experienceSchema = new mongoose.Schema({
  job_title: String,
  company: String,
  duration: String,
  responsibilities: [String],
});

// Schema for Users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true, match: /^.+@.+\..+$/ },
  phone: String,
  social_links: [{ type: String, match: /^(http|https):\/\/.*$/ }],
  profile_picture: String,
  projects: [projectSchema],
  skills: [skillSchema],
  education: [educationSchema],
  experience: [experienceSchema],
});

const User = mongoose.model('users', userSchema);

module.exports = User;