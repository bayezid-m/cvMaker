const express = require('express')
const app = express()
const cors = require('cors')
const {connectDB} = require('./connectMongo')
const bcrypt = require('bcryptjs')
const {emailValidation} = require("./middleWares/userMw")
const userRouter = require("./routes/userRoute")
const educationRouter = require("./routes/educationRouter")
const projectRouter = require("./routes/projectRouter")
const experienceRouter = require("./routes/experienceRouter")
const cvRouter = require("./routes/cvRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 2000;
//user router
app.use("/api/v1/user", userRouter)
//user education router
app.use("/api/v1/user/education", educationRouter)
//user experience roouter
app.use("/api/v1/user/experience", experienceRouter)
//user project router
app.use("/api/v1/project", projectRouter)
//user CV router
app.use("/api/v1/user/CV", cvRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})