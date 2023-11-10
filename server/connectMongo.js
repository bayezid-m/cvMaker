const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        const mongoURL = process.env.DB_RUL;
        await mongoose.connect(mongoURL).then(() => console.log("Db is connected!"));
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    connectDB,
}