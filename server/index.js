const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


app.use(cors())
app.use(express.json())
//mongoose.connect('mongodb://localhost:27017/social')
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cvMaker');
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
};

//Register user
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password:newPassword,
            status: req.body.status,
            occupation: req.body.occupation,
            cv: req.body.cv,
            image: req.body.imageSender,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', user: false })
    }
})
//Login user
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                first_name: user.firstName,
                email: user.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', token: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})
//Authenticate user profle
app.get('/api/user', async (req, res) => {

    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})
        return res.json({ status: 'ok', userData: user})
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
})
//updating user
app.put('/api/user/(:id)', async (req, res) => {
	//console.log(req.body.id);
    //const newPassword = await bcrypt.hash(req.body.password, 10)
	try {
		await User.updateOne({_id:req.body.id}, {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
           // password:newPassword,
            status: req.body.status,
            occupation: req.body.occupation,
            image: req.body.imageSender,
		}).then(()=>{
			return res.json({ status: 'ok'})
		})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token hr' })
	}
})



app.listen(2000, () => {
    console.log('Server is running on port 2000.');
    connectDB();

})