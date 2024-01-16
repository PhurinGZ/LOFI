require('dotenv').config(); // Add this line at the beginning of your script if you are using a .env file

const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected!!');
    } catch (error) {
        console.log('could not connect to database!!', error);
    }
};
