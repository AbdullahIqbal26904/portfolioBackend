const mongoose = require('mongoose');

async function connectToDatabase(url) {
    try {
        const connected = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
        return connected;
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the process with an error code
    }
}

module.exports = {
    connectToDatabase,
};
