const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        //  await mongoose.connect('mongodb://localhost:27017/cvMaker');
        const mongoURL = process.env.DB_RUL;
        await mongoose.connect(mongoURL).then(() => console.log("Connected!"));
        // console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    connectDB,
}