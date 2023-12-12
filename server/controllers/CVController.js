const UserCV = require('../model/userCV')

const handleAddCV = async(req,res)=>{
    try{
        await UserCV.create({
            email: req.body.email,
            image: req.body.image,
        })
        res.json({ status: 'ok' })
    }
    catch(error){
        res.json({ status: 'error', error: error })
    }
}
const handleGetCV = async (req, res) => {
    try {
        const email = req.body.email
        const user = await UserCV.findOne({ email: email })
        return res.json({ status: 'ok', userData: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token hr' })
    }
}
const handleDeleteCVById=async(req, res)=>{
    const id = req.params.id;
	try {
		await UserCV.findByIdAndDelete(id);
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: error })
	}
}
module.exports = {
    handleAddCV,
    handleGetCV,
    handleDeleteCVById,
}