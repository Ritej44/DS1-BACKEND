const express = require('express');
const router = express.Router();

//les endpoint mawjoudin fl authcontroller nekhdmouhom ghadi
const { register, login, logout } = require('../controllers/authController.js');

// Endpoints ll authentification
router.post('/register', register);//serveur yruni tekhdm register
router.post('/login', login);//login tekhdm
router.post('/logout', logout);//logout tekhdm

module.exports = router;