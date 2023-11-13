const mongoose = require('mongoose');
const uri = "mongodb+srv://aaronfung2003:Aa0903528@cluster0.54cgwv9.mongodb.net/?retryWrites=true&w=majority";

async function connectdb() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectdb;
