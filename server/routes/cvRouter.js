const express = require("express")

const {
    handleAddCV,
    handleGetCV,
    handleDeleteCVById
} = require('../controllers/CVController')

const router = express.Router()
router.use(express.json())

//add new CV
router.post('/add', handleAddCV)
//get CV by email
router.post('/email', handleGetCV)
//delete a CV by id
router.delete('/(:id)', handleDeleteCVById)

module.exports = router;