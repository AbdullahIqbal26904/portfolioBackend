const { connectToDatabase } = require('./connection');
const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const educationRoutes = require('./routes/educationRoutes');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const mongoURL = process.env.MONGO_URL;
const port = process.env.PORT || 3000;
if (!mongoURL) {
    console.error('MONGO_URL not found in environment variables');
    process.exit(1);
}

connectToDatabase(mongoURL).then(() => {
    console.log('Server is ready to interact with the database');
});
app.use('/users', userRoutes);
app.use('/skills', skillRoutes);
app.use('/education', educationRoutes);
app.use('/projects', projectRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});