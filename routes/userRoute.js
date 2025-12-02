const express = require('express');
const {
  getAllUsers,    // jib kol l'utilisateurs (ken l manager)
  getUserById,    // jib utilisateur b id
  deleteUser,     // fsekh utilisateur
  updateUser,     // 3addel utilisateur
} = require('../controllers/userController.js');
const { authenticateToken, isManager } = require('../middlewares/authMiddleware'); // middlewares ta3 l'authentification
const router = express.Router();


// Routes ta3 gestion des utilisateurs
router.get('/all', authenticateToken, isManager, getAllUsers); // kol l'utilisateurs (ken l manager)
router.get('/:id', authenticateToken, getUserById); // utilisateur b id 
router.delete('/:id', authenticateToken, isManager, deleteUser); // fsekh utilisateur (ken l manager)
router.put('/:id', authenticateToken, updateUser); // 3addel utilisateur 
module.exports = router;
