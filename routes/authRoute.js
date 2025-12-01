const express = require('express');
const router = express.Router();
//les endpoint mawjoudin fl controller
const { register, login, logout } = require('../controllers/authController');

// Endpoints ll authentification
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;