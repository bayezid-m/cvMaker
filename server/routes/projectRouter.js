const express = require("express")

const {
    handleAddProject,
    handleGetAllProject,
    handleGetAllProjectByEmail
} = require('../controllers/projectController')

const router = express.Router()
router.use(express.json())

//add project for user
router.post('/add', handleAddProject);
//update project for user
// router.put('/update/(:id)', handleUpdateProjectById)
//gettng all project
router.get('/all', handleGetAllProject)
//get all project of an user by email
router.post('/all/email', handleGetAllProjectByEmail)
// //get single project by id
// router.get('/(:id)', handleGetEduById)
// //delete single project of user
// router.delete('/(:id)', handleDeleteEduById)

module.exports = router;