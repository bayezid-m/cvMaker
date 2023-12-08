const express = require("express")

const {
    handleAddExperience,
    handleGetExperience,
    handleGetExperienceById,
    handleUpdateExperienceById,
    handleDeleteExperienceById
} = require('../controllers/experienceController')

const router = express.Router()
router.use(express.json())

//add new experience
router.post('/add', handleAddExperience);
//get experience of an user
router.get('/all', handleGetExperience);
//get an experience by id
router.get('/(:id)', handleGetExperienceById);
//update an experience by id
router.put('/update/(:id)', handleUpdateExperienceById);
//delete an experice by id
router.delete('/(:id)', handleDeleteExperienceById)


module.exports = router;