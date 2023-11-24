const express = require("express")

const {
    handleRegister,
    handleLogin,
    handleGetProfile,
    handleUpdateProfile,
    handleGetProfileByEmail
} = require('../controllers/useController')

const router = express.Router()

router.use(express.json())

//Register user
router.post('/register', handleRegister);

//Login user
router.post('/login', handleLogin);

//Authenticate user profle
router.get('/', handleGetProfile);
//get a user profile by email
router.post('/email', handleGetProfileByEmail);

//updating user
router.put('/(:id)', handleUpdateProfile);

module.exports = router;