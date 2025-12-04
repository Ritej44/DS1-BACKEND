const express = require('express');
const {
  getAllUsers,    // njib kol l'utilisateurs (ken l manager ynajm)
  getUserById,    // njib utilisateur b id
  deleteUser,     // fsekh utilisateur
  updateUser,  
  createUser   // 3addel utilisateur (ken manager zeda)
} = require('../controllers/userController.js');
//adhoukom les methode l bch yetkhedmou f usercontroller 
//o l middleware ll authentification o verification l howa manager
const { authenticateToken, isManager } = require('../Middleware/authMiddleware'); // middlewares ta3 l'authentification
const router = express.Router();


// Routes ta3 gestion des utilisateurs
router.get('/all', authenticateToken, isManager, getAllUsers); //(ken l manager) // api tekhdem avec sucées
router.get('/:id', authenticateToken,getUserById); // testiou postman o yekhdm
router.delete('/:id', authenticateToken, isManager, deleteUser); // (ken l manager yajm yfasakh) // yekhdem zedaa
router.put('/:id', authenticateToken, updateUser); // dima ykhali user n'existe pas
router.post('/', authenticateToken, createUser);// methode run avec succés
module.exports = router;
