const jwt = require('jsonwebtoken')
const UserProject = require('../model/userProject')
const User = require('../model/user')

const handleAddProject = async (req, res) => {
    console.log(req.body);
    try {
        await UserProject.create({
            email: req.body.email,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', success: false, message: error })
    }
}
const handleGetAllProject = async(req, res)=>{
    try {
        const projectData = await UserProject.find();
        
        // Map over each project and fetch user information for the associated email
        const projectsWithUserData = await Promise.all(
            projectData.map(async (project) => {
                const user = await User.findOne({ email: project.email });
                return { ...project._doc, user: user }; // Include user info in each project
            })
        );

        return res.json({ status: 'ok', projectData: projectsWithUserData });
    } catch (error) {
        res.json({ status: 'error', user: false, message: error.message });
    }
}

const handleGetAllProjectByEmail = async(req, res)=>{
    const Email = req.body.email
    try{ 
        const projectData = await UserProject.find({email:Email})
        //const user = await User.findOne({ email: projects.email })
        return res.json({ status: 'ok',  projectData: projectData })
    }
    catch (error) {
        res.json({ status: 'error', user: false, message: error })
    }
}

module.exports = {
    handleAddProject,
    handleGetAllProject,
    handleGetAllProjectByEmail
}