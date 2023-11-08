const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB} = require('./connectMongo')
const bcrypt = require('bcryptjs')
const {emailValidation} = require("./middleWares/userMw")
const userRouter = require("./routes/userRoute")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//user route
app.use("/api/v1/user", userRouter)

app.listen(2000, () => {
    console.log('Server is running on port 2000.');
    connectDB();
})