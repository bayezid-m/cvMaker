const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB} = require('./connectMongo')
const bcrypt = require('bcryptjs')
const {emailValidation} = require("./middleWares/userMw")
const userRouter = require("./routes/userRoute")
const educationRouter = require("./routes/educationRouter")
const projectRouter = require("./routes/projectRouter")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//user router
app.use("/api/v1/user", userRouter)
//user education router
app.use("/api/v1/user/education", educationRouter)
//user experience roouter

//user project router\
app.use("/api/v1/project", projectRouter)

app.listen(2000, () => {
    console.log('Server is running on port 2000.');
    connectDB();
})