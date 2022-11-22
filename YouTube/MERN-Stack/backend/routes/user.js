const { loginUser, signupUser } = require('../controllers/userController')
const express = require('express')

const router = express.Router()

// Login route
router.post('/login', loginUser)

// Singup route
router.post('/signup', signupUser)

module.exports = router