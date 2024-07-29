const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = connect;
