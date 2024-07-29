const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// Load environment variables from .env file
require('dotenv').config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connect;
