const jwt = require('jsonwebtoken')
const userExperience = require('../model/userExperience')

const handleAddExperience = async (req, res) => {
    console.log(req.body);
    try {
        await userExperience.create({
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            farm: req.body.farm,
            starting: req.body.starting,
            ending: req.body.ending
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', user: false, message: error })
    }
}

const handleGetExperience = async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await userExperience.find({ email: email })
        return res.json({ status: 'ok', userData: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}

const handleGetExperienceById = async (req, res) => {
    const id = req.params.id;
    try {
        const userExp = await userExperience.findById(id)
        return res.json({ status: 'ok', userData: userExp })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}

const handleUpdateExperienceById = async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    try {
        await userExperience.updateOne({_id: id}, {
            email: req.body.email,
            title: req.body.title,
            description: req.body.description,
            farm: req.body.farm,
            starting: req.body.starting,
            ending: req.body.ending
        }).then(() => {
            return res.json({ status: 'ok' })
        })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}

const handleDeleteExperienceById=async(req, res)=>{
    const id = req.params.id;
	try {
		await userExperience.findByIdAndDelete(id);
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: error })
	}
}
module.exports = {
    handleAddExperience,
    handleGetExperience,
    handleGetExperienceById,
    handleUpdateExperienceById,
    handleDeleteExperienceById
}