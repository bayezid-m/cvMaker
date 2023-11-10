const express = require("express")

const {
    handleAddEducation,
    handleUpdateEduById,
    handleGetEducation,
    handleGetEduById,
    handleDeleteEduById
} = require('../controllers/educationController')

const router = express.Router()
router.use(express.json())

//add education for user
router.post('/add', handleAddEducation);
//update education for user
router.put('/update/(:id)', handleUpdateEduById)
//gettng all education for single user
router.get('/all', handleGetEducation)
//get single education by id
router.get('/(:id)', handleGetEduById)
//delete single education of user
router.delete('/(:id)', handleDeleteEduById)


module.exports = router;