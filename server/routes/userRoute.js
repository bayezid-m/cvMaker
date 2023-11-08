const express = require("express")

const {
    handleRegister,
    handleLogin,
    handleGetProfile,
    handleUpdateProfile
} = require('../controllers/useController')

const router = express.Router();

router.use(express.json())

//Register user
router.post('/register', handleRegister);

//Login user
router.post('/login', handleLogin);

//Authenticate user profle
router.get('/', handleGetProfile);

//updating user
router.put('/(:id)', handleUpdateProfile);

module.exports = router;